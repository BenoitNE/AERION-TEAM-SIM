# Scénario 001 — US-2841

## Objectif produit

Tester la boucle complète sans embarquer d'IDE ni de toolchain.

## Mise en situation

Le joueur rejoint l'équipe et reçoit un premier bug backend.

Le calcul de seuil thermique se comporte mal pour une température extérieure négative.

## Compétences observées

- lire un ticket ;
- reproduire un bug avec un test ;
- comprendre une règle très simple ;
- modifier du Java existant ;
- conserver le comportement nominal ;
- lancer Maven/JUnit ;
- produire un diff ;
- répondre à une code review.

## Projet

`training-projects/java/thermal-control`

## État initial

Deux tests passent.

Le test négatif échoue.

## Review prototype

L'application ne compile pas le code.

Elle examine uniquement le diff et vérifie des signaux simples :

- code de production modifié ;
- test de régression présent ;
- cas négatif visible ;
- joueur déclare avoir lancé les tests ;
- périmètre du diff raisonnable.

Ce comportement doit rester explicitement présenté comme une review de prototype.

## Critère de validation du produit

Après un playtest, le joueur doit comprendre sans aide :

1. où se trouve le projet ;
2. quoi faire dans son IDE ;
3. comment récupérer `git diff` ;
4. où le coller ;
5. pourquoi la review accepte ou refuse son travail.

La boucle doit être suffisamment agréable pour donner envie d'un second ticket.
