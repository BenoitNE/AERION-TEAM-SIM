# AERION TEAM SIM — Prototype 01

> **AERION** est un nom de travail. Le branding est volontairement isolé pour permettre un renommage ultérieur.

Prototype d'une simulation de carrière dans une équipe de développement logiciel exigeante.

L'application ne remplace pas l'IDE du joueur. Elle fournit le contexte professionnel :

- sprint ;
- tickets ;
- équipe virtuelle ;
- consignes métier ;
- code review ;
- QA ;
- progression.

Le développement réel se fait dans IntelliJ, WebStorm ou l'IDE choisi par le joueur.

## Prototype

Le premier scénario contient un ticket Java simple :

**US-2841 — Régulation thermique : corriger le calcul du seuil**

Boucle testée :

1. lire le ticket ;
2. ouvrir `training-projects/java/thermal-control` dans son IDE ;
3. lancer les tests ;
4. corriger le code ;
5. ajouter/adapter les tests ;
6. produire `git diff` ;
7. coller le diff dans l'application ;
8. soumettre la modification ;
9. recevoir une review déterministe de l'équipe.

## Langue

L'interface et les dialogues sont en français.

Les artefacts techniques restent en anglais :

- noms de classes ;
- méthodes ;
- variables ;
- packages ;
- fichiers source ;
- noms de tests ;
- commandes et sorties d'outils.

Le multilingue sera envisagé plus tard. Il n'est pas implémenté dans ce prototype.

## Lancer l'application

Pré-requis :

- Node.js `^20.19.0 || ^22.12.0 || >=24`
- npm

```bash
npm install
npm start
```

Puis ouvrir l'URL affichée par Angular.

Validation :

```bash
npm test
npm run lint
npm run build
```

## Lancer le projet Java du scénario

Pré-requis :

- Java 25
- Maven

```bash
cd training-projects/java/thermal-control
mvn test
```

Le projet est volontairement livré avec un test en échec.

## Direction artistique

Voir :

- `docs/design/DIRECTION-ARTISTIQUE.md`
- `docs/design/references/minimal-app-reference.png`
- `docs/design/references/team-catalog-reference.png`

Le principe visuel central est : **less is more**.

## Travail avec Codex

Lire d'abord :

- `AGENTS.md`
- `VISION.md`
- `DECISIONS.md`
- `docs/codex/STATUS.md`

Puis exécuter uniquement :

`docs/codex/prompts/01-prototype-foundation.md`

Ne pas construire la carrière complète avant validation manuelle du premier scénario.
