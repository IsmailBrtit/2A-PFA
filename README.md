# Frontend ENSIAS Mobility - Mode développement avec API Mock

## Présentation

Ce projet frontend React est actuellement configuré pour fonctionner avec une **API mock** qui simule les appels backend.

## Pourquoi utiliser une API mock ?

- Permet de développer et tester le frontend indépendamment du backend  
- Évite les blocages liés à l’indisponibilité du backend  
- Facilite les tests et le développement parallèle avec l’équipe backend

## Où se trouve l’API mock ?

Le fichier `src/services/mockApi.js` contient une implémentation simulée des méthodes HTTP (`get`, `post`, `put`, `delete`)  
Ces méthodes retournent des données factices après un délai simulé.

## Services API

Tous les services (ex : `partnerService.js`, `userService.js`) importent actuellement `mockApi.js` pour effectuer leurs opérations.

## Passage à l’API réelle

Pour brancher le backend, il suffit de modifier l’import dans chaque service :  

```js
// Remplacer ceci
import api from './mockApi';

// Par cela
import api from './api';
