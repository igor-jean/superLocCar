/**
 * Types partagés pour DepWatch
 */

/** Informations d'un package extrait du lockfile */
export interface PackageInfo {
  nom: string;
  version: string;
  githubProprietaire?: string;
  githubRepo?: string;
}

/** Informations d'une release GitHub */
export interface ReleaseInfo {
  nomPackage: string;
  versionActuelle: string;
  tagRelease: string;
  datePublication: string;
  contenu: string;
  url: string;
}

/** Niveau de sévérité d'une mise à jour */
export type Severite = 'critique' | 'breaking' | 'majeur' | 'mineur';

/** Niveau de confiance de la classification */
export type Confiance = 'haute' | 'moyenne' | 'basse';

/** Mise à jour classifiée par le LLM */
export interface MiseAJourClassifiee {
  nomPackage: string;
  versionActuelle: string;
  tagRelease: string;
  severite: Severite;
  resume: string;
  confiance: Confiance;
  url: string;
}

/** Résultat complet du digest */
export interface ResultatDigest {
  date: string;
  totalPackages: number;
  packagesAvecRepo: number;
  releasesRecentes: number;
  classifications: MiseAJourClassifiee[];
}
