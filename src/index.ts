#!/usr/bin/env node

/**
 * DepWatch — Point d'entrée CLI
 * Agent de veille intelligent pour les dépendances npm
 */

import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import { parserLockfile } from './parser.js';
import { enrichirAvecGitHub } from './npm-registry.js';
import { recupererReleasesRecentes } from './github.js';
import { classifierReleases } from './classifier.js';
import { afficherDigest, afficherDigestJSON } from './digest.js';
import type { ResultatDigest } from './types.js';

const programme = new Command();

programme
  .name('depwatch')
  .description('Agent de veille intelligent pour surveiller les dépendances npm')
  .version('0.1.0')
  .option('-f, --fichier <chemin>', 'Chemin vers le fichier pnpm-lock.yaml', './pnpm-lock.yaml')
  .option('-s, --depuis <heures>', 'Période de recherche en heures', '24')
  .option('-t, --top <n>', 'Afficher seulement les N premières mises à jour')
  .option('--json', 'Sortie au format JSON')
  .option('--dry-run', 'Parser le lockfile sans récupérer les mises à jour')
  .action(async (options: {
    fichier: string;
    depuis: string;
    top?: string;
    json?: boolean;
    dryRun?: boolean;
  }) => {
    try {
      await executer(options);
    } catch (erreur) {
      if (erreur instanceof Error) {
        console.error(chalk.red(`\n❌ Erreur : ${erreur.message}`));
      } else {
        console.error(chalk.red('\n❌ Erreur inattendue'));
      }
      process.exit(1);
    }
  });

async function executer(options: {
  fichier: string;
  depuis: string;
  top?: string;
  json?: boolean;
  dryRun?: boolean;
}): Promise<void> {
  const depuisHeures = parseInt(options.depuis);

  // Étape 1 : Parser le lockfile
  const spinner1 = ora('Lecture du lockfile...').start();
  const packages = parserLockfile(options.fichier);
  spinner1.succeed(`${packages.length} packages trouvés dans le lockfile`);

  if (options.dryRun) {
    console.log('');
    console.log(chalk.bold('Packages détectés :'));
    for (const pkg of packages) {
      console.log(`  ${chalk.cyan(pkg.nom)} ${chalk.gray(pkg.version)}`);
    }
    console.log('');
    console.log(chalk.dim(`(mode dry-run — pas de requêtes API)`));
    return;
  }

  // Vérifier les tokens
  const tokenGitHub = process.env.GITHUB_TOKEN;
  if (!tokenGitHub) {
    throw new Error(
      'Variable d\'environnement GITHUB_TOKEN manquante.\n' +
      'Créez un token sur https://github.com/settings/tokens'
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      'Variable d\'environnement ANTHROPIC_API_KEY manquante.\n' +
      'Récupérez votre clé sur https://console.anthropic.com'
    );
  }

  // Étape 2 : Enrichir avec les infos GitHub
  const spinner2 = ora('Recherche des repos GitHub sur npm...').start();
  const packagesEnrichis = await enrichirAvecGitHub(packages, (fait, total) => {
    spinner2.text = `Recherche des repos GitHub sur npm... (${fait}/${total})`;
  });
  const avecRepo = packagesEnrichis.filter((p) => p.githubProprietaire);
  spinner2.succeed(`${avecRepo.length}/${packages.length} packages avec un repo GitHub`);

  // Étape 3 : Récupérer les releases récentes
  const spinner3 = ora('Récupération des releases GitHub...').start();
  const releases = await recupererReleasesRecentes(
    packagesEnrichis,
    tokenGitHub,
    depuisHeures,
    (fait, total) => {
      spinner3.text = `Récupération des releases GitHub... (${fait}/${total})`;
    }
  );
  spinner3.succeed(`${releases.length} releases trouvées dans les ${depuisHeures} dernières heures`);

  if (releases.length === 0) {
    const resultat: ResultatDigest = {
      date: new Date().toISOString(),
      totalPackages: packages.length,
      packagesAvecRepo: avecRepo.length,
      releasesRecentes: 0,
      classifications: [],
    };
    if (options.json) {
      afficherDigestJSON(resultat);
    } else {
      afficherDigest(resultat);
    }
    return;
  }

  // Étape 4 : Classifier avec Claude
  const spinner4 = ora('Classification des mises à jour avec Claude...').start();
  let classifications = await classifierReleases(releases, (fait, total) => {
    spinner4.text = `Classification des mises à jour avec Claude... (${fait}/${total})`;
  });
  spinner4.succeed(`${classifications.length} mises à jour classifiées`);

  // Limiter si demandé
  if (options.top) {
    const n = parseInt(options.top);
    classifications = classifications.slice(0, n);
  }

  // Étape 5 : Afficher le digest
  const resultat: ResultatDigest = {
    date: new Date().toISOString(),
    totalPackages: packages.length,
    packagesAvecRepo: avecRepo.length,
    releasesRecentes: releases.length,
    classifications,
  };

  if (options.json) {
    afficherDigestJSON(resultat);
  } else {
    afficherDigest(resultat);
  }
}

programme.parse();
