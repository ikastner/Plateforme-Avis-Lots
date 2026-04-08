# Estimation du projet — Travail, délais et coûts

| Document | Valeur |
| :--- | :--- |
| **Version** | 1.0 |
| **Statut** | Document d’estimation (à ajuster selon l’équipe et le calendrier réel) |
| **Références** | `03-Cahier-des-charges-v2.md`, `05-Conception-detaillee.md` |
| **Date** | 8 avril 2026 |

---

## 1. Rôle et intérêt de l’estimation

L’estimation de projet vise notamment à :

| Objectif | Explication |
| :--- | :--- |
| **Date ou périmètre** | Soit fixer **quelle quantité de travail** peut être **terminée à une date donnée**, soit estimer une **date de livraison** pour une **première version** (MVP) à périmètre donné. |
| **Réduire et contrôler les risques** | Anticiper les zones floues, les dépendances et les écarts par rapport au plan. |
| **Réduire l’incertitude** | Tout projet comporte de l’inconnue ; découper et estimer **réduit la part d’incertitude** sur les gros blocs. |
| **Décision et priorisation** | Servir de **support** pour arbitrer périmètre, ordre des tâches et allocation des ressources. |
| **Confiance** | Des hypothèses explicites et une décomposition lisible **renforcent la crédibilité** du plan auprès des parties prenantes. |
| **Alignement** | **Partager l’information** au sein de l’équipe et cadrer les attentes communes. |

**Limite connue de l’estimation :** l’humain **sous-estime souvent** le temps réel ; plus l’élément à estimer est **gros**, plus l’estimation est **imprécise**. D’où l’intérêt de **découper** en tâches **petites** (quelques heures à quelques jours), puis d’agréger.

---

## 2. Unité de mesure : jour-homme (j/h)

- **Jour-homme (JH)** : effort d’**une personne** pendant **une journée de travail** productive (souvent 7 h ou 8 h selon la convention retenue — à **fixer une fois pour toutes** dans le projet).
- **Durée calendaire** ≠ effort : deux développeurs sur la même tâche peuvent réduire la **durée** sans diviser linéairement l’effort (coordination, intégration).

L’estimation porte ici sur l’**effort total en JH** pour le périmètre MVP défini dans le cahier des charges v2 et la conception détaillée.

---

## 3. Coût du projet (vue financière simplifiée)

### 3.1 Formule usuelle

\[
\text{Coût main-d’œuvre} \approx \text{TJM} \times \text{durée en jours de travail}
\]

- **TJM (taux journalier moyen)** : coût ou prix d’une journée de travail pour un profil (développeur, chef de projet, etc.), **à renseigner** selon contexte (école : coût fictif ou TJM marché pour exercice).
- **Prix des ressources** : en plus du temps humain, prévoir si besoin **hébergement**, **outils**, **assets**, **prestations externes** (design, audit sécurité).

### 3.2 Exemple chiffré (fictif, pour illustration)

| Hypothèse | Valeur |
| :--- | :--- |
| Sous-total effort (lots L0–L14, §5.2) | **98 JH** |
| Contingence **25 %** | **+25 JH** |
| **Effort total retenu** (arrondi) | **≈ 123 JH** |
| TJM moyen retenu (exemple) | **450 €** / jour |
| Coût effort développement (ordre de grandeur) | 123 × 450 € = **55 350 €** |

Ce montant est **indicatif** ; il doit être recalculé avec le **TJM réel** et le **nombre de JH** issu de votre atelier d’estimation (réduction de périmètre = moins de JH).

---

## 4. Critères au-delà du « nombre de jours »

Une estimation sérieuse intègre des critères qui **ne se réduisent pas au temps** :

| Critère | Exemples pour ce projet |
| :--- | :--- |
| **Dépendances** | Validation des textes légaux, maquettes, accès SMTP, environnement d’hébergement. |
| **Volume** | Nombre de rôles, de modules back-office, de règles métier (roue, QR, multi-tenant). |
| **Complexité** | Tirage transactionnel, isolation franchise, parcours public sans compte. |
| **Imprévus** | Bugs d’intégration, retours recette, dette technique — d’où la **contingence** (§5.3). |
| **Compétences** | Courbe d’apprentissage du framework choisi par l’équipe. |

---

## 5. Décomposition et estimation du MVP (référence `05-Conception-detaillee`)

### 5.1 Méthode retenue

- Découpage par **lots de travail** alignés sur les sous-systèmes **SS1 à SS10** et sur les couches **API / front public / back-office / transverse**.
- Pour chaque lot : estimation en **JH** sur une échelle **réaliste** (charge moyenne attendue pour un profil « développeur full-stack » en contexte formation).

**Rappel :** les valeurs ci-dessous sont une **base de discussion** ; elles doivent être **revues en équipe** (planning poker, trois scénarios optimiste / réaliste / pessimiste, etc.).

### 5.2 Tableau d’estimation par lot

| ID | Lot de travail | Contenu principal | JH (est.) |
| :--- | :--- | :--- | :---: |
| L0 | **Projet & infra** | Dépôt Git, CI basique, config env, squelette API + front, connexion SGBDR | 4 |
| L1 | **SS1 — Accès & identité** | Auth, JWT/session, rôles, reset MDP, garde-fous périmètre | 6 |
| L2 | **SS2 — Référentiel** | CRUD franchises / restaurants, paramètres, utilisateurs métier | 5 |
| L3 | **SS3 — Campagnes & lots** | États campagne, CRUD lots, stocks, substitution, validation roue | 8 |
| L4 | **SS4 — QR** | Génération jetons, résolution, désactivation | 4 |
| L5 | **SS5 — Participation publique** | Session anonyme, spin, événements, anti-doublon, formulaire, consentements | 14 |
| L6 | **SS6 — Logistique** | Statuts envoi / retrait, validation « remis » | 4 |
| L7 | **SS7 — Stats & exports** | Agrégations, filtres, CSV | 5 |
| L8 | **SS8 — Plans & facturation** | Affichage plan, limites, historique ou simulation | 3 |
| L9 | **SS9 — Messagerie & e-mails** | Messages in-app, envois transactionnels SMTP | 5 |
| L10 | **SS10 — Audit & RGPD** | Journal minimal, anonymisation / suppression basique | 3 |
| L11 | **Front — parcours parent** | Pages responsive : QR → roue → avis → formulaire | 10 |
| L12 | **Front — dashboard** | Modules Utilisateurs, Communication, Gestion, Opérations, Analyse | 14 |
| L13 | **Tests & recette** | Tests automatisés ciblés, jeux d’essai, corrections | 10 |
| L14 | **Documentation** | README technique, guide déploiement minimal | 3 |

| Synthèse | JH |
| :--- | ---: |
| **Sous-total** | **98** |

### 5.3 Contingence (imprévus)

Pour tenir compte de l’**imprécision** sur les gros lots et des imprévus :

| Option | Taux | JH ajoutés | Total après contingence |
| :--- | :---: | ---: | ---: |
| Contingence **20 %** | 20 % | +20 | **118** |
| Contingence **25 %** (recommandé MVP) | 25 % | +25 | **123** |

**Lien avec §3.2 :** l’exemple de coût utilise le total **123 JH** (98 × 1,25 ≈ 122,5, arrondi). Si le périmètre est **réduit**, refaire la somme des JH puis réappliquer la contingence.

---

## 6. De la charge au calendrier

| Question | Approche |
| :--- | :--- |
| Combien de **jours calendaires** pour le MVP ? | Effort total JH ÷ **nombre de personnes** en parallèle × un coefficient de **charge** (réunions, cours, imprévus déjà partiellement couverts par la contingence). |
| Exemple | 123 JH ÷ **2** développeurs ≈ **62** jours ouvrés « équivalent plein temps » ; si l’équipe n’est disponible qu’en **demi-temps**, la **durée calendaire** double en première approximation. |

---

## 7. Historique des versions

| Version | Date | Modifications |
| :--- | :--- | :--- |
| 1.0 | 08/04/2026 | Première version — cadre cours + estimation indicative MVP |
