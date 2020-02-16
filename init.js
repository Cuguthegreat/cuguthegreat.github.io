import * as backend from './services/backend-calls.js';
import * as entities from './state/entities.js';
import * as squares from './state/squares.js';
import * as battleMap from './view/battle-map.js';
import * as socket from './socket/socket.js';

Promise.all([
        backend.read('entities'),
        backend.read('squares')
    ])
    .then(([entitiesData, squaresData]) => {
        entities.setEntities(entitiesData);
        battleMap.render();
        squares.setSquares(squaresData);
    })

socket.start();
