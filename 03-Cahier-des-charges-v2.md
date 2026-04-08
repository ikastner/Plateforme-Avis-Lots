# Cahier des charges — Plateforme partenaires (gamification avis Google)

| Document | Valeur |
| :--- | :--- |
| **Version** | 1.0 |
| **Statut** | Validé pour conception et réalisation |
| **Document source** | expression du besoin (TP1) + atelier de réponses aux questions ouvertes |
| **Date** | 8 avril 2026 |

---

## 1. Objet et portée du document

### 1.1 Objet

Le présent document définit de façon **exhaustive et opposable** le besoin fonctionnel et non fonctionnel pour la plateforme web interne permettant aux partenaires (franchises et restaurants) de **piloter des campagnes de gamification** (roue de la fortune, avis Google, lots, collecte de données).

Il remplace l'expression du besoin initial pour toute décision de conception, développement, recette et mise en production.

### 1.2 Périmètre

- **Inclus** : application web (interface publique parcours parent + espace authentifié partenaires), règles métier décrites ci-dessous, exigences légales minimales RGPD pour la collecte, reporting et traçabilité des QR codes.
- **Hors périmètre MVP** (sauf mention contraire ultérieure) : intégration API Google Business Profile pour vérifier automatiquement la publication d’un avis ; application mobile native ; gestion transporteur / étiquetage colis ; paiement en ligne côté parent.

---

## 2. Contexte et objectifs

### 2.1 Contexte

La société édite des contenus (histoires) distribués dans les restaurants partenaires. Un **QR code** sur la dernière page prolonge l’expérience : le parent accède à une **roue de la fortune**, est invité à laisser un **avis Google** sur le restaurant concerné, transmet ses **coordonnées** et choisit le **mode de récupération** du lot (envoi ou retrait).

Les partenaires utilisent une **plateforme interne** pour configurer restaurants, campagnes, lots, QR codes et consulter les statistiques.

### 2.2 Objectifs business

| Objectif | Indicateur de succès (directionnel) |
| :--- | :--- |
| Augmenter les avis Google | Nombre d’étapes « participation avis » enregistrées par restaurant / période |
| Référencement local | Cohérent avec le volume d’avis et la sélection du bon établissement |
| Fidélisation familles | Taux de complétion du parcours après scan |
| Base clients exploitable | Contacts collectés avec consentement, export ou consultation dans le dashboard |
| Trafic en magasin | Lots en mode « retrait restaurant » suivis jusqu’à remise |

### 2.3 Objectifs produit (MVP)

- Parcours parent **bout en bout** utilisable sur **navigateur mobile** (scan QR).
- Back-office avec **rôles** et **tableau de bord** conforme aux sections imposées.
- **Traçabilité** des participations par origine (franchise / restaurant / campagne / QR).
- **Configuration** de la roue (lots, probabilités, stocks, visuels, mode de récupération par lot).
- **Conformité RGPD** de base : information, consentement, droits, durée de conservation.

---

## 3. Décisions issues de l’atelier (réponses aux questions ouvertes)

Les points ci-dessous **figent** les ambiguïtés identifiées dans l’analyse du besoin. Ils font partie intégrante du cahier des charges.

| Thème | Décision |
| :--- | :--- |
| **Pilotage projet** | Les jalons et la date de livraison finale sont alignés sur le **calendrier du cours / entreprise** ; le périmètre **MVP** correspond aux exigences de la section 5 et 6 de ce document. |
| **Données collectées** | Formulaire : **nom**, **prénom**, **adresse e-mail**, **téléphone** ; si envoi postal : **adresse postale complète** (pays inclus). Champs optionnels : **préférences de contact** si campagne l’autorise. |
| **RGPD** | La **société éditrice** est **responsable du traitement**. Base légale : **exécution de l’opération de jeu** et **consentement** pour prospection / newsletters si case dédiée. Durée de conservation des données participants : **24 mois** après la dernière interaction, sauf obligation légale contraire. Droit d’accès / rectification / suppression : **procédure** décrite dans la politique de confidentialité et **point de contact** (e-mail désigné). |
| **Avis Google — obligation** | L’**ouverture du lien** vers la fiche Google du restaurant est **obligatoire** avant d’accéder au formulaire de coordonnées. Le parent **confirme sur l’honneur** avoir laissé un avis via une **case à cocher** (« Je confirme avoir publié un avis ») pour **débloquer** la soumission du formulaire. |
| **Comptage « avis généré »** | Métrique **« participation avis »** = enregistrement d’une session ayant **ouvert le lien Google** + **confirmation utilisateur** (case cochée). **Aucune vérification automatique** via Google dans le MVP. |
| **Stock de lots épuisé** | La roue **ne propose que des lots encore disponibles**. Si aucun lot n’est disponible : message **« Stock épuisé pour cette campagne »** et **pas de gain** ; option configurable : **lot de substitution** (texte + visuel dédiés) défini en back-office. |
| **Retrait en restaurant** | Le lot passe au statut **« À retirer »** puis **« Remis »**. La **validation** est effectuée par un **utilisateur Restaurant** (ou rôle équivalent) via l’interface : **confirmation de remise** (avec horodatage et identifiant de participation). |
| **Envoi par la société** | Périmètre logiciel : **workflow de statuts** (ex. : demandé → préparé → expédié), **saisie / consultation adresse**, **historique**. **Pas** d’impression d’étiquette transporteur dans le MVP ; **export** des lignes à expédier possible (CSV). Délais annoncés au parent : **texte configurable** par campagne (ex. : « sous 15 jours ouvrés »). |
| **Réutilisation du QR** | **Une participation enregistrée par couple (QR code + campagne active)** pour un même identifiant léger (cookie / device ID côté front, règle métier : **max 1 gain par QR et par campagne**). Un nouveau scan peut être autorisé pour **statistiques** mais sans nouveau gain si la règle ci-dessus s’applique (paramétrable : **strict** par défaut). |
| **QR restaurant vs campagne** | Les QR **coexistent** : QR **restaurant** (pointe vers campagne par défaut du restaurant) et QR **campagne** (surcharge pour opérations ponctuelles). La traçabilité distingue toujours l’origine. |
| **Comptes Restaurant** | Un compte **par restaurant** pour les opérations quotidiennes (validation retrait, consultation stats locales). Un rôle **Franchise** (voir §4) regroupe la vue multi-restaurants. |
| **Rôle Franchise** | Rôle **Franchise** : accès aux restaurants de sa franchise, campagnes et stats agrégées **sans** accès aux autres franchises. **Administrateur** : accès global plateforme. |
| **Plans & Bills** | **Abonnement** par franchise selon **paliers** (ex. : nombre de restaurants / volume de scans). Le module affiche le **plan actuel**, l’**historique de facturation** (ou simulation en environnement de formation) et les **limites** du plan. |
| **Messages** | **Messagerie interne** (notifications in-app) pour alertes opérationnelles (stock bas, campagne à clôturer) et **e-mails transactionnels** (création de compte, réinitialisation mot de passe, confirmation de participation selon paramétrage). |
| **Technique (cibles)** | Application **web responsive** ; parcours parent **priorité mobile**. Navigateurs : **dernières versions** Chrome, Safari, Firefox, Edge. **HTTPS** obligatoire en production. |

---

## 4. Acteurs et droits

| Rôle | Description synthétique |
| :--- | :--- |
| **Administrateur** | Gestion globale : franchises, utilisateurs, paramètres plateforme, tous restaurants et campagnes, accès complet statistiques. |
| **Franchise** | Gestion des restaurants de sa franchise, campagnes et lots dans son périmètre, consultation statistiques agrégées. |
| **Restaurant** | Opérations d’un établissement : validation des retraits, consultation des participations et stats **de son restaurant**. |
| **Parent (utilisateur final)** | Non authentifié : parcours scan → roue → avis → formulaire → choix logistique. |

*Matrice détaillée des droits (CRUD par module) à produire en phase de conception technique ; les interdictions entre franchises sont **strictes** (isolation des données).*

---

## 5. Exigences fonctionnelles

### 5.1 Parcours public (parent)

1. Scan du QR → chargement du **contexte** (franchise / restaurant / campagne selon le type de QR).
2. Sélection du restaurant si le contexte l’exige (ex. QR multi-sites).
3. Affichage de la **roue** animée ; tirage conforme aux **probabilités** et **stocks** ; résultat immédiat.
4. **Redirection ou ouverture** du **lien Google** propre au restaurant ; traçage de l’événement « lien ouvert ».
5. Écran **avis** : case de confirmation obligatoire pour continuer.
6. **Formulaire** coordonnées + cases légales (CGU / politique de confidentialité / consentements).
7. Choix **envoi** ou **retrait** selon options offertes par le lot ; récapitulatif et confirmation.

### 5.2 Gestion des entités

- **Franchises** : création, association des restaurants, plan d’abonnement.
- **Restaurants** : fiche, **URL avis Google** unique, rattachement franchise.
- **Campagnes** : dates, statut (brouillon / active / clôturée), association restaurants concernés, textes légaux affichés côté public.
- **Lots** : libellé, visuel, quantité, probabilité relative, modes de récupération autorisés, lot de substitution éventuel.
- **QR codes** : génération, type (franchise / restaurant / campagne), lien traceable, désactivation.

### 5.3 Dashboard (sections imposées)

| Zone | Contenu attendu |
| :--- | :--- |
| **Utilisateurs** | Liste et fiche **clients** (participants) : coordonnées, consentements, restaurant / campagne d’origine, statut du lot. |
| **Communication** | Centre de **messages** et préférences d’alertes ; envoi d’e-mails transactionnels listés §3. |
| **Gestion** | **Plans & Bills**, **Settings** (paramètres compte et franchise), **Restaurants**. |
| **Opérations** | **Campagnes**, **Lots** (création, édition, stocks). |
| **Analyse** | **Statistiques** : scans, participations, participations avis (définition §3), lots distribués, filtres par restaurant / période. |

### 5.4 Règles et intégrité

- Impossible de soumettre le formulaire sans **lien Google ouvert** (événement tracé) et **case de confirmation** cochée.
- Décrémenter les stocks de lots de manière **cohérente** avec le tirage (transaction logique ou file d’attente selon architecture retenue).
- Journalisation minimale des actions sensibles back-office (connexion, clôture campagne, remise lot).

---

## 6. Exigences non fonctionnelles

| Domaine | Exigence |
| :--- | :--- |
| **Sécurité** | Authentification sécurisée (mots de passe robustes, stockage hashé, session expirable) ; **contrôle d’accès par rôle** ; **HTTPS** en production. |
| **Performance** | Parcours public : temps de chargement perçu adapté au mobile (objectif directionnel : **< 3 s** sur réseau 4G typique pour le premier écran utile après scan). |
| **Disponibilité** | Cible directionnelle **99 %** en heures d’ouverture des restaurants (hors maintenance annoncée). |
| **RGPD** | Mention des finalités, durée, droits ; registre des traitements maintenu côté organisation ; possibilité de **suppression** ou **anonymisation** sur demande dans les délais légaux. |
| **Accessibilité** | Effort raisonnable **WCAG 2.1 niveau AA** sur les parcours critiques (formulaires, contrastes, focus) — priorisation en conception. |

---

## 7. Critères d’acceptation (recette)

Le produit est **accepté** pour le MVP si :

1. Un parcours complet peut être exécuté **de bout en bout** sur mobile (scan simulé ou QR de test).
2. Les rôles **Administrateur**, **Franchise** et **Restaurant** **ne peuvent pas** accéder aux données hors périmètre.
3. Les statistiques affichent au minimum : **scans**, **participations**, **participations avis** (définition §3), **lots** par statut, **filtre par restaurant**.
4. La roue respecte **stocks** et **probabilités** configurées ; comportement **stock nul** conforme §3.
5. Les **mentions légales** et **consentements** sont affichés et stockés pour chaque participation.
6. Export CSV des participations ou lots à expédier **disponible** pour au moins un rôle autorisé.

---

## 8. Livrables attendus (hors code)

- Spécifications détaillées ou **backlog** priorisé.
- Maquettes ou wireframes des écrans critiques (parcours public + dashboard).
- Plan de tests (scénarios de recette alignés sur la section 7).
- Documentation d’exploitation minimale (comptes, environnements, sauvegardes).

---

## 9. Glossaire

| Terme | Définition |
| :--- | :--- |
| **Campagne** | Période et configuration marketing regroupant roue, lots et QR associés. |
| **Participation** | Enregistrement d’un parcours complet depuis le scan jusqu’à la confirmation finale. |
| **Participation avis** | Événement retenu pour les KPI « avis », selon la définition §3. |
| **MVP** | Version minimale livrable couvrant les exigences de ce document pour une mise en service pilote. |

---

## 10. Historique des versions

| Version | Date | Modifications |
| :--- | :--- | :--- |
| 1.0 | — | Document initial TP1 |
| 2.0 | 08/04/2026 | Prise en compte de l’analyse du besoin ; décisions d’atelier intégrées ; structure cahier des charges opérationnel |
