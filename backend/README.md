# API — Plateforme partenaires

Backend **NestJS** + **Prisma** + **PostgreSQL**, préfixe global **`/api/v1`**.

## Prérequis

- Node.js 20+
- Docker (pour PostgreSQL en local)

## Démarrage rapide

1. **Base de données** (depuis la racine du dépôt Git) :

   ```bash
   docker compose up -d
   ```

2. **Variables d’environnement** : copier `../.env.example` vers `../.env` et/ou `backend/.env` avec au minimum :

   ```env
   DATABASE_URL="postgresql://plateforme:plateforme_dev@localhost:5432/plateforme"
   PORT=4000
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Migrations** :

   ```bash
   cd backend
   npm install
   npx prisma migrate deploy
   npm run prisma:generate
   ```

4. **Lancer l’API** :

   ```bash
   npm run start:dev
   ```

   - Santé : [http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health)

## Structure des modules

| Dossier `src/` | Rôle |
| :--- | :--- |
| `prisma/` | `PrismaModule` / `PrismaService` |
| `health/` | Liveness |
| `auth/` | Authentification (à implémenter) |
| `franchise/`, `restaurant/` | Référentiel organisation |
| `campaign/`, `prize/` | Campagnes et lots |
| `qr/` | Jetons QR |
| `participation/` | Parcours public |
| `stats/`, `billing/`, `notification/`, `audit/` | Statistiques, plans, messages, audit |

Les contrôleurs exposent pour l’instant des réponses **stub** (`GET` sur la ressource) pour valider le routage.

## Commandes Prisma

| Script | Action |
| :--- | :--- |
| `npm run prisma:generate` | Régénérer le client |
| `npm run prisma:migrate:dev` | migrations en dev (`npx prisma migrate dev`) |
| `npm run prisma:migrate` | appliquer les migrations (`deploy`) |
