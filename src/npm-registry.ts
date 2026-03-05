/**
 * Client pour l'API du registre npm
 * Récupère les informations de repository GitHub pour chaque package
 */

import pLimit from 'p-limit';
import type { PackageInfo } from './types.js';

const URL_REGISTRE = 'https://registry.npmjs.org';
const CONCURRENCE = 10;

/**
 * Extrait le propriétaire et le nom du repo GitHub depuis une URL de repository
 *
 * Formats gérés :
 * - git+https://github.com/owner/repo.git
 * - https://github.com/owner/repo
 * - github:owner/repo
 * - git://github.com/owner/repo.git
 * - git+ssh://git@github.com/owner/repo.git
 */
function extraireGitHub(urlRepo: string): { proprietaire: string; repo: string } | null {
  // Format court : github:owner/repo
  if (urlRepo.startsWith('github:')) {
    const parties = urlRepo.slice(7).split('/');
    if (parties.length >= 2) {
      return { proprietaire: parties[0], repo: parties[1].replace(/\.git$/, '') };
    }
    return null;
  }

  // URLs GitHub classiques
  const regex = /github\.com[/:]([^/]+)\/([^/]+?)(?:\.git)?(?:\/|$)/;
  const match = urlRepo.match(regex);
  if (match) {
    return { proprietaire: match[1], repo: match[2] };
  }

  return null;
}

/**
 * Récupère les infos GitHub d'un package depuis le registre npm
 */
async function enrichirPackage(pkg: PackageInfo): Promise<PackageInfo> {
  try {
    const reponse = await fetch(`${URL_REGISTRE}/${pkg.nom}/latest`);
    if (!reponse.ok) return pkg;

    const donnees = (await reponse.json()) as {
      repository?: { url?: string } | string;
    };

    let urlRepo: string | undefined;
    if (typeof donnees.repository === 'string') {
      urlRepo = donnees.repository;
    } else if (donnees.repository?.url) {
      urlRepo = donnees.repository.url;
    }

    if (!urlRepo) return pkg;

    const github = extraireGitHub(urlRepo);
    if (!github) return pkg;

    return {
      ...pkg,
      githubProprietaire: github.proprietaire,
      githubRepo: github.repo,
    };
  } catch {
    // Erreur réseau ou parsing — on passe silencieusement
    return pkg;
  }
}

/**
 * Enrichit une liste de packages avec leurs infos GitHub
 * Utilise une limite de concurrence pour éviter de surcharger le registre
 */
export async function enrichirAvecGitHub(
  packages: PackageInfo[],
  surProgression?: (fait: number, total: number) => void
): Promise<PackageInfo[]> {
  const limite = pLimit(CONCURRENCE);
  let fait = 0;

  const promesses = packages.map((pkg) =>
    limite(async () => {
      const resultat = await enrichirPackage(pkg);
      fait++;
      surProgression?.(fait, packages.length);
      return resultat;
    })
  );

  return Promise.all(promesses);
}
