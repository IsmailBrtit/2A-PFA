# Frontend ENSIAS Mobility - Mode développement avec API Mock

## Présentation

Ce projet frontend React est actuellement configuré pour fonctionner avec une **API mock** qui simule les appels backend.

## Pourquoi utiliser une API mock ?

- Permet de développer et tester le frontend indépendamment du backend  
- Évite les blocages liés à l’indisponibilité du backend  
- Facilite les tests et le développement parallèle avec l’équipe backend  
- Assure une base stable de données pour prototyper l’interface utilisateur

## Où se trouve l’API mock ?

Le fichier `src/services/mockApi.js` contient une implémentation simulée des méthodes HTTP (`get`, `post`, `put`, `delete`).  
Ces méthodes retournent des données factices après un délai simulé (fonction `delay`).

Les services métier (`partnerService.js`, `userService.js`, `mobilityService.js`, `userService.js`, etc.) importent actuellement `mockApi.js` pour effectuer leurs opérations.

Les données mock, comme `mobilitiesMock` dans `mobilityService.js`, contiennent des valeurs statiques utilisées pour l’affichage et le filtrage (ex : statuts `PENDING_DOCS`, `VALIDATED`, etc.).

## Attention aux valeurs des données mock

- Les valeurs des enums (ex : `status` de mobilité) doivent **correspondre exactement** à celles définies dans le backend, sinon les filtres et affichages risquent de ne pas fonctionner correctement.
- Les structures des objets retournés par les mocks doivent être compatibles avec le modèle de données backend (noms des champs, types, relations).
- Par exemple, `mobilitiesMock` doit respecter les attributs et formats attendus côté frontend, pour éviter les incohérences.

## Passage à l’API réelle

Pour brancher le backend, il suffit de modifier l’import dans chaque service :  

```js
// Remplacer ceci dans les fichiers de service
import api from './mockApi';

// Par cela (l’API réelle, configurée dans src/services/api.js)
import api from './api';
