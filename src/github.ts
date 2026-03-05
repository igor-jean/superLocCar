/**
 * Client pour l'API GitHub
 * Récupère les releases récentes des repos de packages
 */

import pLimit from 'p-limit';
import type { PackageInfo, ReleaseInfo } from './types.js';

const URL_API = 'https://api.github.com';
const CONCURRENCE = 5;

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  body: string;
  html_url: string;
}

/**
 * Récupère les releases récentes d'un repo GitHub
 */
async function recupererReleases(
  pkg: PackageInfo,
  token: string,
  depuisDate: Date
): Promise<ReleaseInfo[]> {
  if (!pkg.githubProprietaire || !pkg.githubRepo) return [];

  try {
    const reponse = await fetch(
      `${URL_API}/repos/${pkg.githubProprietaire}/${pkg.githubRepo}/releases?per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'DepWatch/0.1.0',
        },
      }
    );

    // Vérifier le rate limit
    const restant = reponse.headers.get('X-RateLimit-Remaining');
    if (restant && parseInt(restant) < 100) {
      const reset = reponse.headers.get('X-RateLimit-Reset');
      const resetDate = reset ? new Date(parseInt(reset) * 1000) : null;
      console.warn(
        `⚠️  Rate limit GitHub bas (${restant} restant). Reset : ${resetDate?.toLocaleTimeString() ?? 'inconnu'}`
      );
    }

    if (!reponse.ok) return [];

    const releases = (await reponse.json()) as GitHubRelease[];

    // Filtrer les releases publiées après la date limite
    return releases
      .filter((r) => new Date(r.published_at) >= depuisDate)
      .map((r) => ({
        nomPackage: pkg.nom,
        versionActuelle: pkg.version,
        tagRelease: r.tag_name,
        datePublication: r.published_at,
        contenu: r.body || '',
        url: r.html_url,
      }));
  } catch {
    return [];
  }
}

/**
 * Récupère toutes les releases récentes pour une liste de packages
 */
export async function recupererReleasesRecentes(
  packages: PackageInfo[],
  token: string,
  depuisHeures: number,
  surProgression?: (fait: number, total: number) => void
): Promise<ReleaseInfo[]> {
  const depuisDate = new Date(Date.now() - depuisHeures * 60 * 60 * 1000);
  const packagesAvecRepo = packages.filter((p) => p.githubProprietaire && p.githubRepo);
  const limite = pLimit(CONCURRENCE);
  let fait = 0;

  const promesses = packagesAvecRepo.map((pkg) =>
    limite(async () => {
      const releases = await recupererReleases(pkg, token, depuisDate);
      fait++;
      surProgression?.(fait, packagesAvecRepo.length);
      return releases;
    })
  );

  const resultats = await Promise.all(promesses);
  return resultats.flat();
}
