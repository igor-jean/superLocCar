/**
 * Parseur de fichiers pnpm-lock.yaml
 * Supporte les formats lockfile v6+ et v9
 */

import { readFileSync } from 'node:fs';
import { parse as parseYaml } from 'yaml';
import type { PackageInfo } from './types.js';

interface LockfileData {
  lockfileVersion?: string | number;
  packages?: Record<string, unknown>;
  snapshots?: Record<string, unknown>;
  importers?: Record<string, unknown>;
}

/**
 * Extrait le nom et la version d'une clé de package du lockfile
 *
 * Formats supportés :
 * - v6 : "/@scope/name@version" ou "/name@version"
 * - v9 : "@scope/name@version" ou "name@version"
 */
function extraireDepuisCle(cle: string): { nom: string; version: string } | null {
  // Retirer le slash initial si présent (format v6)
  const clePropre = cle.startsWith('/') ? cle.slice(1) : cle;

  // Trouver le dernier @ qui sépare le nom de la version
  // Pour les packages scopés (@scope/name@version), on cherche le @ après le /
  let indexVersion: number;
  if (clePropre.startsWith('@')) {
    // Package scopé : @scope/name@version
    const indexSlash = clePropre.indexOf('/');
    if (indexSlash === -1) return null;
    indexVersion = clePropre.indexOf('@', indexSlash + 1);
  } else {
    // Package non scopé : name@version
    indexVersion = clePropre.indexOf('@');
  }

  if (indexVersion === -1 || indexVersion === 0) return null;

  const nom = clePropre.slice(0, indexVersion);
  const version = clePropre.slice(indexVersion + 1);

  // Ignorer les versions avec des parenthèses (peer deps dans v9)
  const versionPropre = version.split('(')[0];

  if (!nom || !versionPropre) return null;

  return { nom, version: versionPropre };
}

/**
 * Parse un fichier pnpm-lock.yaml et retourne la liste des packages
 */
export function parserLockfile(cheminFichier: string): PackageInfo[] {
  const contenu = readFileSync(cheminFichier, 'utf-8');
  const donnees: LockfileData = parseYaml(contenu);

  if (!donnees || typeof donnees !== 'object') {
    throw new Error(`Impossible de parser le fichier lockfile : ${cheminFichier}`);
  }

  const version = String(donnees.lockfileVersion ?? '');
  const packagesVus = new Map<string, PackageInfo>();

  // Récupérer les packages depuis la section appropriée
  const sectionPackages = donnees.packages ?? {};

  for (const cle of Object.keys(sectionPackages)) {
    const resultat = extraireDepuisCle(cle);
    if (!resultat) continue;

    // Dédupliquer par nom (garder la première version trouvée)
    if (!packagesVus.has(resultat.nom)) {
      packagesVus.set(resultat.nom, {
        nom: resultat.nom,
        version: resultat.version,
      });
    }
  }

  // Pour v9, aussi vérifier la section snapshots
  if (donnees.snapshots) {
    for (const cle of Object.keys(donnees.snapshots)) {
      const resultat = extraireDepuisCle(cle);
      if (!resultat) continue;

      if (!packagesVus.has(resultat.nom)) {
        packagesVus.set(resultat.nom, {
          nom: resultat.nom,
          version: resultat.version,
        });
      }
    }
  }

  const packages = Array.from(packagesVus.values());
  packages.sort((a, b) => a.nom.localeCompare(b.nom));

  return packages;
}
