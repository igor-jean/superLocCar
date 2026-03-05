# DepWatch

Agent de veille intelligent qui surveille vos dépendances npm et vous livre un digest priorisé par sécurité et stabilité.

## Fonctionnement

```
pnpm-lock.yaml
      ↓
Parser → liste de packages + versions actuelles
      ↓
npm registry API → trouver le repo GitHub de chaque package
      ↓
GitHub API → récupérer releases + changelogs récents
      ↓
Claude API → classifier (🔴 CVE / 🟠 Breaking / 🟡 Major / 🟢 Minor)
      ↓
Digest coloré dans le terminal
```

## Prérequis

- Node.js >= 20
- pnpm
- Un token GitHub : https://github.com/settings/tokens
- Une clé API Anthropic : https://console.anthropic.com

## Installation

```bash
pnpm install
pnpm build
```

## Configuration

Créez un fichier `.env` ou exportez les variables :

```bash
export GITHUB_TOKEN="ghp_votre_token"
export ANTHROPIC_API_KEY="sk-ant-votre_cle"
```

## Utilisation

```bash
# Mode développement
pnpm dev -f chemin/vers/pnpm-lock.yaml

# Mode dry-run (parser le lockfile sans appels API)
pnpm dev --dry-run -f chemin/vers/pnpm-lock.yaml

# Rechercher les mises à jour des 48 dernières heures
pnpm dev -f pnpm-lock.yaml --depuis 48

# Sortie JSON
pnpm dev -f pnpm-lock.yaml --json

# Afficher seulement les 5 premières mises à jour
pnpm dev -f pnpm-lock.yaml --top 5
```

## Options CLI

| Option | Description | Défaut |
|--------|-------------|--------|
| `-f, --fichier <chemin>` | Chemin vers le fichier pnpm-lock.yaml | `./pnpm-lock.yaml` |
| `-s, --depuis <heures>` | Période de recherche en heures | `24` |
| `-t, --top <n>` | Nombre max de mises à jour affichées | toutes |
| `--json` | Sortie au format JSON | non |
| `--dry-run` | Parser sans requêtes API | non |

## Architecture

```
src/
├── index.ts          # Point d'entrée CLI + orchestration
├── types.ts          # Types TypeScript partagés
├── parser.ts         # Parseur pnpm-lock.yaml (v6+ et v9)
├── npm-registry.ts   # Client registre npm (résolution GitHub)
├── github.ts         # Client GitHub API (releases)
├── classifier.ts     # Classification LLM via Claude API
└── digest.ts         # Rendu terminal coloré
```

## Classification des mises à jour

| Icône | Niveau | Description |
|-------|--------|-------------|
| 🔴 | CRITIQUE | CVE, faille de sécurité, correctif de sécurité |
| 🟠 | BREAKING | Changements cassants |
| 🟡 | MAJEUR | Nouvelles fonctionnalités, corrections importantes |
| 🟢 | MINEUR | Petits correctifs, documentation, refactoring |

## Licence

MIT
