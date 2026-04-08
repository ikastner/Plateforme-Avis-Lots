# TP1 : Introduction à la gestion de projet

## Contexte et objectifs du projet

### Présentation générale

La société souhaite développer une plateforme digitale interne destinée à ses partenaires (franchises et restaurants).

**Les enjeux principaux sont :**

- Stimuler les avis Google et renforcer la fidélisation client.
- Créer une base de données clients qualifiée.
- Prolonger l'expérience des licences présentes dans les menus enfants.

### Objectif global

L'objectif est de créer une plateforme web interne permettant de piloter une campagne de **gamification marketing** axée sur les avis Google, le gain de cadeaux et la collecte de données.

### Objectifs business

- Augmenter les avis Google.
- Améliorer le référencement local.
- Fidéliser les familles.
- Créer une base de données clients exploitable.
- Générer du trafic physique dans les restaurants.

---

## Parcours utilisateur

Le parcours est conçu en 9 étapes clés :

1. **Réception** : L'enfant reçoit une histoire de plusieurs pages au restaurant.
2. **QR Code** : Un QR code est placé sur la dernière page.
3. **Scan** : Le parent scanne le QR code.
4. **Sélection** : Le parent choisit le restaurant partenaire concerné.
5. **Engagement** : Une roue de la fortune s'affiche à l'écran.
6. **Jeu** : Le parent joue et découvre immédiatement son gain.
7. **Action** : Le parent est invité à laisser un avis Google.
8. **Collecte** : Le parent remplit un formulaire avec ses coordonnées.
9. **Logistique** : Le parent choisit entre l'envoi du lot par la société ou le retrait en restaurant.

---

## Spécifications fonctionnelles

### Interface et dashboard

L'application doit disposer d'une interface de connexion sécurisée avec une gestion fine des rôles (Administrateur, Restaurant). Le tableau de bord (dashboard) doit inclure les sections suivantes :

| Catégorie | Description |
| :--- | :--- |
| **Utilisateurs** | Gestion des clients. |
| **Communication** | Section Messages. |
| **Gestion** | Plans & Bills, Settings, Restaurants. |
| **Opérations** | Campagnes, Lots. |
| **Analyse** | Statistiques. |

### Gestion des restaurants et QR codes

- **Enregistrement** : Chaque franchise peut gérer plusieurs restaurants.
- **Liaison Google** : Chaque restaurant doit être relié à son propre lien Google pour la collecte des avis.
- **Traçabilité** : Le système doit générer des QR codes uniques par franchise, restaurant ou campagne pour suivre l'origine des participations.

### Personnalisation de la roue

La « roue de la fortune » doit être entièrement configurable :

- Produits mis en jeu et visuels des lots.
- Probabilités de gain et quantités disponibles.
- Mode de récupération associé (envoi ou retrait).

### Gestion des lots et statistiques

Le système assure le suivi du statut des lots selon deux modes : l'envoi par la société ou le retrait sur place.

La plateforme doit piloter la performance via les indicateurs suivants :

- Volume de scans QR code et de participations.
- Nombre d'avis Google générés et de lots distribués.
- Analyse détaillée des performances par restaurant.
