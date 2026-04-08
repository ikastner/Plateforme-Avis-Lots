# Plateforme partenaires (gamification avis Google)

Projet **Qualité et ingénierie logicielle** : plateforme interne pour franchises et restaurants (parcours QR, roue, avis Google, lots, dashboard).

## Dépôt

| Dossier | Contenu |
| :--- | :--- |
| [`docs/`](docs/) | Documentation (besoin, CDC, conception, estimation, PERT, Gantt) et [`docs/README.md`](docs/README.md). |
| [`backend/`](backend/) | **API NestJS** + Prisma + PostgreSQL — voir [`backend/README.md`](backend/README.md). |

## Stack technique

| Couche | Technologie |
| :--- | :--- |
| Front (prévu) | Next.js (App Router) + TypeScript |
| API | NestJS + TypeScript |
| Données | PostgreSQL + **Prisma** (ORM retenu) |

Détail : [`docs/04-Conception-generale-architecture.md`](docs/04-Conception-generale-architecture.md) §10.

## Démarrage rapide (API)

```bash
docker compose up -d
cp .env.example .env
cd backend && npm install && npx prisma migrate deploy && npm run start:dev
```

API : `http://localhost:4000/api/v1/health`

## Auteurs & licence

Projet de cours — adapter crédits et licence selon votre établissement.
