# Projet — Plateforme partenaires (gamification avis Google)

Dépôt de **documentation** pour un projet de **gestion de projet** et d’**ingénierie logicielle** : conception d’une plateforme web interne destinée aux franchises et restaurants partenaires (parcours QR, roue de la fortune, collecte d’avis Google, lots, tableau de bord).

Ce dépôt ne contient **pas encore de code applicatif** ; il rassemble les livrables rédigés (expression du besoin, cahier des charges, architecture, estimation, planning).

---

## Contenu du dépôt

| Fichier | Description |
| :--- | :--- |
| `01-Expression-besoin.md` | Expression du besoin initiale (énoncé / TP). |
| `02-Analyse-besoin-questions-ouvertes.md` | Analyse : ce qui est clair, ce qui manque, questions ouvertes. |
| `03-Cahier-des-charges-v2.md` | Cahier des charges consolidé (décisions d’atelier, exigences, critères d’acceptation). |
| `04-Conception-generale-architecture.md` | Conception générale : architecture logicielle (vues, modules, données conceptuelles). |
| `05-Conception-detaillee.md` | Conception détaillée : sous-systèmes, fonctions, API, matrice des droits. |
| `06-Estimation-projet.md` | Estimation en jours-homme, contingence, exemple de coût (TJM). |
| `07-Diagramme-PERT.md` | Réseau PERT, durées trois temps, chemin critique. |
| `08-Diagramme-Gantt.md` | Diagramme de Gantt (Mermaid) et tableau des dates au plus tôt. |

---

## Ordre de lecture recommandé

1. Expression du besoin → analyse → cahier des charges v2.  
2. Conception générale → conception détaillée.  
3. Estimation → PERT → Gantt.

---

## Contexte métier (rappel)

- **Côté public** : scan d’un QR code (menu enfant / histoire) → sélection du restaurant → roue → invitation à un avis Google → formulaire → choix du mode de récupération du lot.  
- **Côté partenaires** : authentification par rôles (administrateur, franchise, restaurant), dashboard (utilisateurs, communication, gestion, opérations, analyse), campagnes, lots, QR traçables, statistiques.

---

## Outils

- Les diagrammes **Mermaid** (architecture, PERT, Gantt) peuvent être prévisualisés dans Cursor / VS Code ou sur [mermaid.live](https://mermaid.live).

---

## Auteurs & licence

Projet réalisé dans le cadre du cours **Qualité et ingénierie logicielle** (gestion de projet).  
Adapter crédits et licence selon les exigences de votre établissement.
