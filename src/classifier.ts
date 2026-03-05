/**
 * Classificateur LLM utilisant Claude API
 * Analyse les changelogs et classifie les mises à jour par sévérité
 */

import Anthropic from '@anthropic-ai/sdk';
import type { ReleaseInfo, MiseAJourClassifiee, Severite, Confiance } from './types.js';

const TAILLE_LOT = 10;

const PROMPT_SYSTEME = `Tu es un expert en sécurité et maintenance de dépendances logicielles.
Tu analyses des changelogs de packages npm et tu classifies chaque mise à jour selon sa sévérité.

Niveaux de sévérité :
- critique : Contient un CVE, une faille de sécurité, ou un correctif de sécurité
- breaking : Contient des changements cassants (breaking changes)
- majeur : Nouvelles fonctionnalités significatives ou corrections de bugs importants
- mineur : Petits correctifs, documentation, refactoring

Niveaux de confiance :
- haute : Le changelog est clair et explicite
- moyenne : Le changelog est ambigu mais interprétable
- basse : Le changelog est vide, incomplet ou impossible à interpréter

Réponds UNIQUEMENT en JSON valide, sans commentaires ni texte autour.`;

interface ReponseClassification {
  classifications: Array<{
    nomPackage: string;
    severite: Severite;
    resume: string;
    confiance: Confiance;
  }>;
}

/**
 * Classifie un lot de releases via Claude API
 */
async function classifierLot(
  client: Anthropic,
  releases: ReleaseInfo[]
): Promise<MiseAJourClassifiee[]> {
  const descriptions = releases
    .map(
      (r, i) =>
        `[${i + 1}] Package : ${r.nomPackage} (actuel: ${r.versionActuelle}, release: ${r.tagRelease})
Changelog :
${r.contenu.slice(0, 2000) || '(vide)'}
---`
    )
    .join('\n\n');

  const prompt = `Analyse ces ${releases.length} mises à jour de dépendances et classifie chacune.

${descriptions}

Réponds en JSON avec ce format exact :
{
  "classifications": [
    {
      "nomPackage": "nom-du-package",
      "severite": "critique|breaking|majeur|mineur",
      "resume": "Résumé en une ligne en français",
      "confiance": "haute|moyenne|basse"
    }
  ]
}

Si le changelog est vide ou incompréhensible, utilise le résumé "Pas assez d'informations pour classifier" avec confiance "basse" et sévérité "mineur".`;

  const reponse = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: PROMPT_SYSTEME,
    messages: [{ role: 'user', content: prompt }],
  });

  // Extraire le texte de la réponse
  const texte = reponse.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('');

  // Parser le JSON
  let donnees: ReponseClassification;
  try {
    donnees = JSON.parse(texte) as ReponseClassification;
  } catch {
    // Tenter d'extraire le JSON du texte
    const match = texte.match(/\{[\s\S]*\}/);
    if (!match) {
      // Retourner des classifications par défaut en cas d'échec
      return releases.map((r) => ({
        nomPackage: r.nomPackage,
        versionActuelle: r.versionActuelle,
        tagRelease: r.tagRelease,
        severite: 'mineur' as Severite,
        resume: 'Erreur lors de la classification',
        confiance: 'basse' as Confiance,
        url: r.url,
      }));
    }
    donnees = JSON.parse(match[0]) as ReponseClassification;
  }

  // Mapper les résultats avec les releases originales
  return releases.map((release, i) => {
    const classification = donnees.classifications[i];
    return {
      nomPackage: release.nomPackage,
      versionActuelle: release.versionActuelle,
      tagRelease: release.tagRelease,
      severite: classification?.severite ?? 'mineur',
      resume: classification?.resume ?? 'Pas assez d\'informations',
      confiance: classification?.confiance ?? 'basse',
      url: release.url,
    };
  });
}

/**
 * Classifie toutes les releases par lots
 */
export async function classifierReleases(
  releases: ReleaseInfo[],
  surProgression?: (fait: number, total: number) => void
): Promise<MiseAJourClassifiee[]> {
  if (releases.length === 0) return [];

  const client = new Anthropic();
  const resultats: MiseAJourClassifiee[] = [];
  let fait = 0;

  // Découper en lots
  for (let i = 0; i < releases.length; i += TAILLE_LOT) {
    const lot = releases.slice(i, i + TAILLE_LOT);
    const classifications = await classifierLot(client, lot);
    resultats.push(...classifications);
    fait += lot.length;
    surProgression?.(fait, releases.length);
  }

  return resultats;
}
