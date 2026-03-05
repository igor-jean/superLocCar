/**
 * Rendu du digest dans le terminal
 * Affiche les mises à jour classifiées avec des couleurs
 */

import chalk from 'chalk';
import type { MiseAJourClassifiee, ResultatDigest, Severite } from './types.js';

const ICONES: Record<Severite, string> = {
  critique: '🔴',
  breaking: '🟠',
  majeur: '🟡',
  mineur: '🟢',
};

const LABELS: Record<Severite, string> = {
  critique: 'CRITIQUE',
  breaking: 'BREAKING',
  majeur: 'MAJEUR',
  mineur: 'MINEUR',
};

const COULEURS: Record<Severite, (text: string) => string> = {
  critique: chalk.red.bold,
  breaking: chalk.hex('#FF8C00').bold,
  majeur: chalk.yellow.bold,
  mineur: chalk.green,
};

const ORDRE_SEVERITE: Severite[] = ['critique', 'breaking', 'majeur', 'mineur'];

/**
 * Affiche le digest complet dans le terminal
 */
export function afficherDigest(resultat: ResultatDigest): void {
  const date = new Date(resultat.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // En-tête
  console.log('');
  console.log(chalk.cyan('╔══════════════════════════════════════════════════╗'));
  console.log(chalk.cyan(`║  ${chalk.bold('DepWatch')} — Digest du ${date}`.padEnd(59) + '║'));
  console.log(chalk.cyan('╠══════════════════════════════════════════════════╣'));
  console.log(chalk.cyan(`║  ${String(resultat.totalPackages).padStart(3)} packages surveillés`.padEnd(49) + '║'));
  console.log(chalk.cyan(`║  ${String(resultat.packagesAvecRepo).padStart(3)} avec repo GitHub`.padEnd(49) + '║'));
  console.log(chalk.cyan(`║  ${String(resultat.releasesRecentes).padStart(3)} mises à jour récentes`.padEnd(49) + '║'));
  console.log(chalk.cyan('╚══════════════════════════════════════════════════╝'));
  console.log('');

  if (resultat.classifications.length === 0) {
    console.log(chalk.green('  ✅ Aucune mise à jour détectée dans la période.'));
    console.log('');
    return;
  }

  // Grouper par sévérité
  const groupes = new Map<Severite, MiseAJourClassifiee[]>();
  for (const classification of resultat.classifications) {
    const liste = groupes.get(classification.severite) ?? [];
    liste.push(classification);
    groupes.set(classification.severite, liste);
  }

  // Afficher par ordre de sévérité
  for (const severite of ORDRE_SEVERITE) {
    const mises = groupes.get(severite);
    if (!mises || mises.length === 0) continue;

    const couleur = COULEURS[severite];
    console.log(couleur(`  ${ICONES[severite]} ${LABELS[severite]}`));
    console.log('');

    for (const maj of mises) {
      console.log(couleur(`    ${maj.nomPackage} ${maj.versionActuelle} → ${maj.tagRelease}`));
      console.log(chalk.gray(`    ${maj.resume}`));
      if (maj.confiance === 'basse') {
        console.log(chalk.dim.gray(`    (confiance basse)`));
      }
      console.log(chalk.dim(`    ${maj.url}`));
      console.log('');
    }
  }

  // Résumé
  const sansMAJ = resultat.totalPackages - resultat.classifications.length;
  if (sansMAJ > 0) {
    console.log(chalk.green(`  ✅ Aucune mise à jour pour ${sansMAJ} autres packages`));
    console.log('');
  }
}

/**
 * Affiche le digest au format JSON
 */
export function afficherDigestJSON(resultat: ResultatDigest): void {
  console.log(JSON.stringify(resultat, null, 2));
}
