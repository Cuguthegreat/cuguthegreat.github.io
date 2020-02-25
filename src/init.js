import * as backend from './services/backend-calls.js';
import * as entities from './state/entities.js';
import * as squares from './state/squares.js';
import * as battleMap from './view/battle-map.js';
import * as entityCreator from './view/entity-creator.js';
import * as socket from './services/socket-helper.js';
import * as multiSelect from './view/multi-select.js';
import * as features from './services/feature-flags.js';
import * as html from './services/html-helper.js';

export const initBattleMap = (entitiesData, squaresData) => {
    entities.setEntities(entitiesData);
    squares.setSquares(squaresData);
    battleMap.renderBattleMap();
    entityCreator.renderEntityCreator();
    // features.isTestEnv() && multiSelect.activateMultiSelect();
};

html.createHtmlElement({tagName: 'script', parent: document.head, attributes: {src: 'ressources/socket.io.js'}});

Promise.all([backend.read('entities'), backend.read('squares')]).then(
    ([entitiesData, squaresData]) => {
        initBattleMap(entitiesData, squaresData);
        socket.start();
    }
);
