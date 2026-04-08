# Analyse du besoin et questions ouvertes

Document de cadrage suite à la lecture de l'expression du besoin (TP1 — plateforme de gamification partenaires).

---

## 1. Ce qui est clair

### Contexte et objectifs

- Plateforme **web interne** pour **partenaires** (franchises et restaurants).
- Objectif : piloter une **campagne de gamification** (avis Google, cadeaux, collecte de données).
- Enjeux business explicités : avis Google, référencement local, fidélisation familles, base clients, trafic en restaurant.

### Parcours utilisateur (côté parent / client final)

- Enchaînement en **9 étapes** : histoire → QR sur dernière page → scan → choix du restaurant → roue → jeu / gain → invitation avis Google → formulaire coordonnées → choix envoi société ou retrait restaurant.

### Côté back-office / administration

- **Authentification sécurisée** avec rôles au minimum : **Administrateur** et **Restaurant**.
- **Dashboard** structuré en zones : Utilisateurs (clients), Communication (Messages), Gestion (Plans & Bills, Settings, Restaurants), Opérations (Campagnes, Lots), Analyse (Statistiques).

### Données et opérations métier

- Une **franchise** peut gérer **plusieurs restaurants**.
- Chaque restaurant a un **lien Google** dédié pour les avis.
- **QR codes traçables** : unicité possible par franchise, restaurant ou campagne.
- **Roue** : configuration des lots, visuels, probabilités, quantités, mode de récupération (envoi / retrait).
- **Suivi des lots** selon envoi par la société ou retrait sur place.
- **Indicateurs** : scans, participations, avis générés, lots distribués, performance par restaurant.

---

## 2. Ce qui manque ou reste implicite

| Domaine | Manque ou ambiguïté |
| :--- | :--- |
| **Conformité et données personnelles** | Pas de mention explicite du **RGPD**, durée de conservation, droits des personnes, base légale de la collecte. |
| **Vérification des avis Google** | Le CDC ne précise pas **comment** on compte ou vérifie qu’un avis a bien été laissé (honor system, délai, preuve, API Google). |
| **Ordre parcours / dépendances** | Inviter à l’avis **avant** ou **après** le formulaire : le texte place l’avis avant la collecte ; la logique métier (bloquant ou non) n’est pas détaillée. |
| **« Plans & Bills »** | Nature exacte : abonnement, facturation réelle, ou simple libellé métier à préciser. |
| **Messages** | Canal (e-mail, in-app, SMS), destinataires, templates — non spécifié. |
| **Multi-franchise / multi-tenant** | « Partenaires » suggère plusieurs entités ; le modèle d’isolation des données (par franchise, par restaurant) n’est pas formalisé. |
| **Technique** | intégrations (API Google Business, etc.) |
| **Sécurité** | Niveau attendu au-delà de « connexion sécurisée » (2FA, journalisation, etc.) non décrit. |

---

## 3. Questions ouvertes (à clarifier)

Les questions ci-dessous sont formulées pour être posées au commanditaire, à l’enseignant ou tranchées en atelier d’affinage.

### Périmètre et pilotage du projet

1. Quels sont les **jalons** ou la **date de livraison** cible pour une première version utilisable (MVP) ?
2. Quels livrables sont **strictement obligatoires** pour valider le TP / le projet par rapport à ce qui est « nice to have » ?

### Données personnelles et conformité

3. Quelles **données exactement** doivent être collectées dans le formulaire (champs obligatoires / optionnels) ?
4. Quelles **obligations RGPD** doivent être couvertes (consentement, information, durée de conservation, droit d’accès/suppression) et qui est **responsable du traitement** côté société ?

### Parcours et règles métier

5. L’étape **avis Google** est-elle **obligatoire** pour débloquer le gain ou le formulaire, ou peut-on participer sans laisser d’avis ?
6. Comment définit-on qu’un **« avis Google a été généré »** pour les statistiques : simple clic sur le lien, déclaration sur l’honneur, autre critère acceptable pour le périmètre du projet ?

### Roue, lots et logistique

7. Que se passe-t-il si les **quantités** d’un lot sont **épuisées** : message de substitution, autre lot, report ?
8. Le **retrait en restaurant** : qui **valide** côté restaurant que le lot a été remis (workflow dans l’app) ?
9. L’**envoi par la société** : périmètre géographique, délais annoncés au parent, lien avec un outil de transport / étiquettes — qu’est-ce qui est **dans** le périmètre logiciel ?

### QR codes et campagnes

10. Un même parent peut-il **rejouer** plusieurs fois (même QR, campagne différente) ? Y a-t-il des **limites** par personne / par période ?
11. Les QR **par campagne** remplacent-ils ou **coexistent** avec les QR par restaurant pour un même lieu ?

### Rôles et organisation

12. Le rôle **Restaurant** : un compte par **établissement** ou un compte **multi-restaurants** pour une même franchise ?
13. Existe-t-il un rôle ou un besoin pour un **utilisateur « siège » / franchise** distinct de l’administrateur global de la plateforme ?

### Plans, facturation et communication

14. Que recouvrent précisément **Plans & Bills** dans le dashboard (abonnement partenaire, facturation interne, maquette sans logique métier pour le TP) ?
15. Quel est l’objectif minimal de la section **Messages** pour une première version (notification interne, e-mail, autre) ?


---

## 4. Prochaine étape suggérée

Prioriser les réponses aux questions **1–2** (périmètre TP) et **3–6** (données et parcours), puis figer un **périmètre MVP** documenté avant l’architecture détaillée et le planning.
