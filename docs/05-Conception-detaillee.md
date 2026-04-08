# Conception détaillée — Fonctions et sous-ensembles logiciels

| Document | Valeur |
| :--- | :--- |
| **Version** | 1.0 |
| **Statut** | Spécification de conception détaillée |
| **Références** | `03-Cahier-des-charges-v2.md`, `04-Conception-generale-architecture.md` |
| **Date** | 8 avril 2026 |

---

## 1. Objet et structure du document

### 1.1 Objet

Ce document précise les **sous-systèmes** du logiciel, leurs **fonctions** (comportement attendu, entrées/sorties, règles), le **modèle de données logique**, les **interfaces API** (ressources et opérations), la **matrice des droits** par module et les **états** des entités dynamiques. Il permet d’aligner développement, tests et recette sur une même granularité fonctionnelle.

### 1.2 Cartographie des sous-systèmes

| ID | Sous-système | Description synthétique |
| :--- | :--- | :--- |
| **SS1** | Accès & identité | Authentification partenaires, sessions, profils, rattachements franchise / restaurant. |
| **SS2** | Référentiel organisation | Franchises, restaurants, utilisateurs métier, paramètres plateforme. |
| **SS3** | Campagnes & lots | Cycle de vie des campagnes, configuration des lots et de la roue, stocks. |
| **SS4** | QR & résolution | Création, désactivation et résolution des jetons QR vers le contexte métier. |
| **SS5** | Participation & parcours public | Session anonyme, événements de parcours, tirage, formulaire, consentements. |
| **SS6** | Logistique & lots attribués | Statuts d’expédition et de retrait, validation « remis ». |
| **SS7** | Statistiques & exports | Agrégations, filtres, export CSV. |
| **SS8** | Plans & facturation | Plan courant, limites, historique ou simulation. |
| **SS9** | Messagerie & notifications | Messages in-app, préférences, e-mails transactionnels. |
| **SS10** | Audit & conformité | Journal d’audit, traçabilité des actions sensibles, support suppression / anonymisation RGPD. |

---

## 2. SS1 — Accès & identité

### 2.1 Périmètre

Gestion des **comptes partenaires** uniquement (pas de compte parent). Émission et validation des **jetons d’accès** (session ou JWT) ; association **utilisateur → rôle → franchise et/ou restaurant**.

### 2.2 Fonctions

| ID | Fonction | Description | Entrées | Sorties / effets |
| :--- | :--- | :--- | :--- | :--- |
| F1.1 | **Créer utilisateur (admin)** | Création d’un compte avec rôle et rattachements. | E-mail, mot de passe (ou invitation), rôle, `franchise_id`, `restaurant_id` selon rôle | Utilisateur persisté ; e-mail invitation ou activation selon politique |
| F1.2 | **Authentifier** | Vérification des identifiants. | E-mail, mot de passe | Jeton de session / JWT ; contexte rôle + périmètre |
| F1.3 | **Déconnecter** | Invalidation du jeton côté serveur ou liste de révocation. | Jeton courant | Session terminée |
| F1.4 | **Demander réinitialisation mot de passe** | Génération d’un jeton à usage unique à durée courte. | E-mail | E-mail avec lien (SS9) ; enregistrement du hash du jeton |
| F1.5 | **Confirmer réinitialisation** | Mise à jour du mot de passe. | Jeton, nouveau mot de passe | Mot de passe hashé ; jeton invalidé |
| F1.6 | **Lire profil connecté** | Retourne identité, rôle, franchises / restaurants autorisés. | Utilisateur issu du jeton | DTO profil |
| F1.7 | **Mettre à jour profil** | Nom affiché, préférences notifications (si prévu). | Champs modifiables | Profil à jour |
| F1.8 | **Vérifier périmètre** | Fonction transverse : pour une ressource (`franchise_id`, `restaurant_id`), indique si l’utilisateur courant peut lire/écrire. | Utilisateur, ressource, action | Booléen + code d’erreur métier |

**Règles :** un utilisateur **Restaurant** est lié à **exactement un** `restaurant_id`. Un utilisateur **Franchise** est lié à **un** `franchise_id` (plusieurs restaurants visibles). **Administrateur** : pas de filtre tenant obligatoire sur les opérations globales.

---

## 3. SS2 — Référentiel organisation

### 3.1 Périmètre

**Franchises**, **restaurants**, paramètres par franchise, liaison utilisateurs (hors détail auth dans F1).

### 3.2 Fonctions

| ID | Fonction | Description |
| :--- | :--- | :--- |
| F2.1 | **CRUD Franchise** | Création, lecture, mise à jour, désactivation logique (admin). |
| F2.2 | **CRUD Restaurant** | Fiche restaurant : nom, adresse, `franchise_id`, **URL avis Google** obligatoire, campagne par défaut optionnelle pour QR restaurant. |
| F2.3 | **Lister restaurants** | Filtrage par `franchise_id` selon périmètre utilisateur. |
| F2.4 | **Paramètres franchise** | Identité légale affichée sur parcours public si besoin, contact RGPD, textes par défaut. |
| F2.5 | **Lier plan à franchise** | Association du plan d’abonnement courant (SS8). |

---

## 4. SS3 — Campagnes & lots

### 4.1 Périmètre

Campagnes (périodes, statuts, textes légaux), **lots** (stock, poids de tirage, visuels, modes de récupération), association **campagne ↔ restaurants**, **lot de substitution** si stock global nul.

### 4.2 États — Campagne

| État | Signification |
| :--- | :--- |
| `draft` | Brouillon, non visible publiquement. |
| `active` | Visible pour les QR et parcours rattachés. |
| `closed` | Terminée ; pas de nouveau tirage. |

Transitions : `draft` → `active` (publication) ; `active` → `closed` (clôture manuelle ou date fin).

### 4.3 Fonctions

| ID | Fonction | Description |
| :--- | :--- | :--- |
| F3.1 | **Créer / modifier campagne** | Dates début/fin, textes légaux (CGU, confidentialité affichés côté public), association **liste de `restaurant_id`**. |
| F3.2 | **Publier / clôturer campagne** | Change l’état ; journalise (SS10). |
| F3.3 | **CRUD Lot** | Libellé, description courte, `image_url` ou fichier (SS fichiers), `stock_remaining`, `weight` (probabilité relative), `allowed_fulfillment` ∈ {`ship`, `pickup`, `both`}, flag `is_fallback` pour lot de substitution. |
| F3.4 | **Valider configuration roue** | Avant activation : au moins un lot avec stock > 0 **ou** lot de substitution configuré ; somme des poids > 0 pour les lots éligibles au tirage. |
| F3.5 | **Lire lots pour tirage** | Retourne uniquement les lots avec `stock_remaining > 0` ou logique de substitution si aucun stock (CDC §3). |

---

## 5. SS4 — QR & résolution

### 5.1 Périmètre

Génération d’identifiants **uniques** encodés dans les QR ; résolution vers **contexte** : type, `franchise_id`, `restaurant_id`, `campaign_id` (selon type).

### 5.2 Types de jeton QR

| Type | Résolution typique |
| :--- | :--- |
| `franchise` | Franchise seule ; la campagne active par défaut doit être déterminée par règle métier (ex. une seule campagne `active` par franchise) ou refus si ambigu. |
| `restaurant` | `restaurant_id` + campagne par défaut du restaurant (champ restaurant ou dernière campagne active liée). |
| `campaign` | `campaign_id` explicite + restaurant(s) couverts par la campagne. |

### 5.3 Fonctions

| ID | Fonction | Description |
| :--- | :--- | :--- |
| F4.1 | **Générer QR** | Crée un `qr_token` (UUID ou slug signé), enregistre type + références ; retourne **URL publique** à encoder (ex. `https://app/qr/{token}`). |
| F4.2 | **Désactiver QR** | Le jeton ne résout plus (410 Gone ou message métier). |
| F4.3 | **Résoudre QR** | Entrée : identifiant brut du QR. Sortie : `ResolveResult` : `franchise_id`, `restaurant_id` (nullable si multi-sélection UI), `campaign_id`, liste `restaurant_ids` si choix requis, métadonnées affichage. |
| F4.4 | **Valider campagne active** | Si campagne résolue non `active`, erreur métier explicite. |

---

## 6. SS5 — Participation & parcours public

### 6.1 Périmètre

Sessions **sans compte** ; événements **scan**, **wheel_spun**, **google_link_opened**, **review_confirmed**, **form_submitted** ; tirage **pondéré** ; règle **1 gain max par couple (jeton QR, campagne)** pour un identifiant appareil / session (CDC §3).

### 6.2 États — Participation (agrégat)

| État | Signification |
| :--- | :--- |
| `started` | Scan enregistré, contexte chargé. |
| `spun` | Tirage effectué ; lot attribué (ou échec stock / substitution). |
| `review_pending` | Gain connu ; lien Google non encore validé côté parcours. |
| `review_done` | Lien ouvert + case confirmation cochée (prérequis formulaire). |
| `completed` | Formulaire soumis et choix logistique enregistré. |
| `abandoned` | Timeout ou abandon (optionnel, pour stats de funnel). |

### 6.3 Fonctions

| ID | Fonction | Description |
| :--- | :--- | :--- |
| F5.1 | **Démarrer ou reprendre participation** | Après résolution QR : crée `Participation` ou reprend la session existante valide ; enregistre événement `scan` ; applique règle anti-triche « déjà gain » pour ce QR + campagne + device. |
| F5.2 | **Lister restaurants (sélection)** | Si le contexte QR l’exige, retourne les restaurants éligibles pour la campagne. |
| F5.3 | **Enregistrer choix restaurant** | Fixe `restaurant_id` pour la participation si pertinent. |
| F5.4 | **Exécuter tirage** | Transaction : sélection aléatoire pondérée sur lots disponibles ; décrément `stock_remaining` ; création `PrizeAssignment` ; événement `wheel_spun` ; si aucun stock, message substitution ou erreur métier. |
| F5.5 | **Enregistrer ouverture lien Google** | Endpoint dédié appelé après clic (ou page intermédiaire) ; événement `google_link_opened` horodaté. |
| F5.6 | **Enregistrer confirmation avis** | Case cochée côté client + envoi serveur ; événement `review_confirmed`. Sans F5.5 déjà enregistré, refus (CDC §5.4). |
| F5.7 | **Soumettre formulaire** | Valide champs obligatoires (nom, prénom, email, téléphone, adresse si envoi) ; consentements ; crée `ContactData` ; événement `form_submitted` ; passe à `completed`. |
| F5.8 | **Choisir mode de récupération** | `ship` ou `pickup` selon lot ; met à jour `PrizeAssignment.fulfillment` et statut logistique initial (SS6). |

---

## 7. SS6 — Logistique & lots attribués

### 7.1 États — `PrizeAssignment` (extrait)

| État | Mode | Description |
| :--- | :--- | :--- |
| `pending_fulfillment` | — | Gain verrouillé, choix logistique à finaliser ou en attente traitement. |
| `awaiting_pickup` | Retrait | Prêt au retrait en restaurant. |
| `picked_up` | Retrait | Remis — horodatage + `user_id` restaurant validateur. |
| `awaiting_shipment` | Envoi | Adresse collectée ; à préparer. |
| `shipped` | Envoi | Expédié (saisie manuelle ou import). |

### 7.2 Fonctions

| ID | Fonction | Description |
| :--- | :--- | :--- |
| F6.1 | **Lister lots à retirer** | Filtre `restaurant_id` = périmètre utilisateur ; statuts `awaiting_pickup`. |
| F6.2 | **Marquer comme remis** | Transition vers `picked_up` ; audit (SS10). |
| F6.3 | **Mettre à jour statut expédition** | Workflow demandé → préparé → expédié ; champs date / commentaire optionnels. |
| F6.4 | **Exporter expéditions CSV** | Lignes filtrables par franchise / période / statut. |

---

## 8. SS7 — Statistiques & exports

### 8.1 Indicateurs (définitions alignées CDC §3)

| Indicateur | Règle de calcul (MVP) |
| :--- | :--- |
| Scans | Nombre d’événements `scan` distincts ou total selon politique (préférence : **total événements**). |
| Participations | Nombre de participations ayant atteint au moins `spun`. |
| Participations avis | Participations avec `google_link_opened` **et** `review_confirmed`. |
| Lots distribués | `PrizeAssignment` créés (hors annulation). |
| Par restaurant | Jointure sur `restaurant_id` de la participation. |

### 8.2 Fonctions

| ID | Fonction | Description |
| :--- | :--- | :--- |
| F7.1 | **Tableau de bord agrégé** | Filtres : `franchise_id`, `restaurant_id`, plage de dates ; retourne compteurs ci-dessus. |
| F7.2 | **Export CSV participations** | Colonnes : identifiants non sensibles + statut participation + dates événements clés ; données personnelles selon droit RGPD et rôle. |
| F7.3 | **Export CSV lots à expédier** | Pour préparation logistique (SS6). |

---

## 9. SS8 — Plans & facturation

### 9.1 Fonctions

| ID | Fonction | Description |
| :--- | :--- | :--- |
| F8.1 | **Lire plan courant** | Paliers : ex. nombre max de restaurants, scans / mois — affichage des limites et consommation courante (compteurs). |
| F8.2 | **Historique facturation** | Liste factures ou **simulation** en environnement de formation (CDC §3). |
| F8.3 | **Vérifier quota** | Avant création QR ou campagne : bloquer ou alerter si dépassement (politique à trancher : soft limit vs hard limit). |

---

## 10. SS9 — Messagerie & notifications

### 10.1 Fonctions

| ID | Fonction | Description |
| :--- | :--- | :--- |
| F9.1 | **Lister messages in-app** | Fil utilisateur / franchise ; non lus en tête. |
| F9.2 | **Marquer comme lu** | |
| F9.3 | **Créer alerte système** | Ex. stock bas, campagne à clôturer — émis par job ou par seuil. |
| F9.4 | **Envoyer e-mail transactionnel** | Modèles : bienvenue, reset MDP, confirmation participation (si activé). |

---

## 11. SS10 — Audit & conformité

### 11.1 Fonctions

| ID | Fonction | Description |
| :--- | :--- | :--- |
| F10.1 | **Journaliser action** | Champs : `timestamp`, `actor_user_id`, `action`, `entity_type`, `entity_id`, payload réduit. |
| F10.2 | **Demande suppression RGPD** | Workflow manuel ou ticket ; anonymisation des champs contact sur `Participation` / `ContactData` après délai légal ; trace conservée si obligation. |

---

## 12. Modèle de données logique (tables principales)

Les noms sont indicatifs ; types exacts en implémentation (UUID, TIMESTAMP TZ, etc.).

| Table | Rôle | Colonnes principales |
| :--- | :--- | :--- |
| `franchise` | Tenant | `id`, `name`, `status`, `settings_json`, `plan_id` |
| `restaurant` | Établissement | `id`, `franchise_id`, `name`, `google_review_url`, `default_campaign_id` nullable |
| `app_user` | Compte partenaire | `id`, `email`, `password_hash`, `role` enum, `franchise_id` nullable, `restaurant_id` nullable |
| `campaign` | Campagne | `id`, `franchise_id`, `status`, `starts_at`, `ends_at`, `legal_copy_json` |
| `campaign_restaurant` | N-N | `campaign_id`, `restaurant_id` |
| `prize` | Lot | `id`, `campaign_id`, `label`, `image_url`, `stock_initial`, `stock_remaining`, `weight`, `allowed_fulfillment`, `is_fallback` |
| `qr_token` | Jeton QR | `id`, `public_slug`, `type`, `franchise_id`, `restaurant_id` nullable, `campaign_id` nullable, `is_active` |
| `participation` | Parcours | `id`, `campaign_id`, `restaurant_id`, `qr_token_id`, `state`, `device_fingerprint` nullable, `created_at`, `updated_at` |
| `participation_event` | Traçabilité | `id`, `participation_id`, `type`, `payload_json`, `occurred_at` |
| `contact_data` | RGPD | `id`, `participation_id`, champs personnels, `consents_json`, `retention_until` |
| `prize_assignment` | Gain | `id`, `participation_id`, `prize_id`, `fulfillment`, `status`, `shipped_at`, `picked_up_at`, `validated_by_user_id` |
| `invoice_or_bill` | Facturation simulée | `id`, `franchise_id`, `period`, `amount`, `status` |
| `notification` | In-app | `id`, `user_id`, `title`, `body`, `read_at` |
| `audit_log` | Audit | `id`, `user_id`, `action`, `entity`, `entity_id`, `metadata_json`, `created_at` |

**Index recommandés :** `(participation.campaign_id, participation.qr_token_id, participation.device_fingerprint)` pour la règle anti-doublon gain ; `(participation_event.participation_id, type)` ; `(restaurant.franchise_id)`.

---

## 13. Interfaces API (ressources et opérations)

Convention : préfixe `/api/v1` ; JSON ; erreurs `{ "code", "message", "details?" }`.

### 13.1 Auth

| Méthode | Ressource | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/login` | Corps : email, mot de passe → jeton. |
| `POST` | `/auth/logout` | Invalidation. |
| `POST` | `/auth/forgot-password` | E-mail. |
| `POST` | `/auth/reset-password` | Jeton, nouveau mot de passe. |
| `GET` | `/auth/me` | Profil courant. |

### 13.2 Administration métier (JWT requis)

| Méthode | Ressource | Description |
| :--- | :--- | :--- |
| `GET/POST/PATCH/DELETE` | `/franchises`, `/franchises/{id}` | SS2 |
| `GET/POST/PATCH/DELETE` | `/restaurants`, `/restaurants/{id}` | SS2 |
| `GET/POST/PATCH/DELETE` | `/campaigns`, `/campaigns/{id}` | Publier/clôturer : `POST .../publish`, `.../close` |
| `GET/POST/PATCH/DELETE` | `/campaigns/{id}/prizes`, `/prizes/{id}` | SS3 |
| `POST` | `/qr-tokens`, `GET /qr-tokens/{id}` | Génération / métadonnées |
| `PATCH` | `/qr-tokens/{id}/deactivate` | SS4 |

### 13.3 Parcours public (jeton participation ou cookie signé)

| Méthode | Ressource | Description |
| :--- | :--- | :--- |
| `GET` | `/public/qr/{slug}/resolve` | F4.3 — démarre participation F5.1 |
| `POST` | `/public/participations/{id}/select-restaurant` | F5.3 |
| `POST` | `/public/participations/{id}/spin` | F5.4 |
| `POST` | `/public/participations/{id}/google-link-opened` | F5.5 |
| `POST` | `/public/participations/{id}/review-confirmed` | F5.6 |
| `POST` | `/public/participations/{id}/submit-contact` | F5.7 |
| `POST` | `/public/participations/{id}/fulfillment` | F5.8 |

### 13.4 Restaurant & stats

| Méthode | Ressource | Description |
| :--- | :--- | :--- |
| `GET` | `/restaurant/pickups` | F6.1 |
| `POST` | `/restaurant/pickups/{assignmentId}/confirm` | F6.2 |
| `GET` | `/stats/summary` | F7.1 — query params filtres |
| `GET` | `/exports/participations.csv` | F7.2 |
| `GET` | `/exports/shipments.csv` | F7.3 |

---

## 14. Matrice des droits (CRUD synthétique)

Lecture **R**, création **C**, mise à jour **U**, suppression **D**, export **X**. « — » interdit.

| Ressource / zone | Admin | Franchise | Restaurant |
| :--- | :---: | :---: | :---: |
| Franchises | CRUD | R (la sienne) | — |
| Restaurants | CRUD | CRUD (sa franchise) | R (le sien) |
| Utilisateurs métier | CRUD | CRU (sa franchise) | — |
| Campagnes & lots | CRUD | CRUD (sa franchise) | R (restaurants liés) |
| QR | CRUD | CRUD (sa franchise) | — |
| Stats globales | R | R (sa franchise) | R (son restaurant) |
| Retraits / pickup | R | R | RU (son restaurant) |
| Plans & factures | CRUD | R (sa franchise) | — |
| Exports | X | X (périmètre) | X (restaurant seul) |
| Messages | CRUD | RU | RU |

---

## 15. Diagramme de séquence — Tirage (aperçu)

```mermaid
sequenceDiagram
  participant C as Client public
  participant API as API
  participant DB as Base

  C->>API: POST .../spin (participation_id)
  API->>DB: BEGIN; verrou participation + lots
  API->>DB: SELECT lots disponibles (stock > 0)
  alt Aucun lot
    API->>DB: ROLLBACK ou lot substitution
    API-->>C: 409 ou résultat substitution
  else Tirage OK
    API->>DB: UPDATE stock_remaining; INSERT prize_assignment
    API->>DB: INSERT participation_event wheel_spun
    API->>DB: COMMIT
    API-->>C: 200 + détail du gain
  end
```

---

## 16. Côté client — regroupement écran / fonction

| Zone UI | Fonctions principales |
| :--- | :--- |
| Parcours public | F4.3, F5.1–F5.8 |
| Dashboard Utilisateurs | Liste participants / fiches contact (lecture SS5/SS6) |
| Communication | F9.1–F9.2 |
| Gestion — Plans & Bills | F8.1–F8.2 |
| Gestion — Settings | F2.4, F1.6–F1.7 |
| Gestion — Restaurants | F2.2–F2.3 |
| Opérations — Campagnes / Lots | F3.1–F3.5 |
| Analyse | F7.1 |
| Restaurant — Retraits | F6.1–F6.2 |

---

## 17. Historique des versions

| Version | Date | Modifications |
| :--- | :--- | :--- |
| 1.0 | 08/04/2026 | Première version — conception détaillée |
