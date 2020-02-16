import * as backend from './services/backend-calls.js';
import * as entities from './state/entities.js';
import * as squares from './state/squares.js';
import * as battleMap from './view/battle-map.js';
import * as entityCreator from './view/entity-creator.js';
import * as socket from './services/socket.js';

Promise.all([backend.read('entities'), backend.read('squares')]).then(
    ([entitiesData, squaresData]) => {
        entities.setEntities(entitiesData);
        squares.setSquares(squaresData);
        battleMap.renderBattleMap();
        entityCreator.renderEntityCreator();
    }
);

socket.start();
