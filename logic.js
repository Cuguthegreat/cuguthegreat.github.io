import * as backend from './services/backend-calls.js';
import * as entities from './state/entities.js';
import * as squares from './state/squares.js';
import * as battleMap from './view/battle-map.js';
import * as socket from './socket/socket.js';

const PROTECTED_ENTITIES = ['5e409e27ee7ee6001715c7b4', '5e409e27ee7ee6001715c7b3', '5e409e27ee7ee6001715c7b2'];

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

const deleteEntity = event => {
    if (PROTECTED_ENTITIES.indexOf(draggedEntityId) >= 0 ) {
        alert('Not even in your dreams, bitch!')
        return;
    }
    event.preventDefault();

    document.getElementById(draggedEntityId) && document.getElementById(draggedEntityId).remove();

    backend.remove(`entities/${draggedEntityId}`)
}

window.deleteEntity = deleteEntity;