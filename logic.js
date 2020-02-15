import {getTombstone, getSquareNode} from './services/html-selectors.js';
import * as backend from './services/backend-calls.js';
import * as colorPicker from './view/color-picker.js';
import * as entities from './state/entities.js';
import * as squares from './state/squares.js';
import * as battleMap from './view/battle-map.js';
import * as socket from './socket/socket.js';

const PROTECTED_ENTITIES = ['5e409e27ee7ee6001715c7b4', '5e409e27ee7ee6001715c7b3', '5e409e27ee7ee6001715c7b2'];

const updateSquareLabel = (event, squareId) => {
    const squareLabelPicker = getSquareLabelPicker();
    const label = squareLabelPicker.value;

    squareLabelPicker.remove();
    store.setSquareNodeWithLabelPicker(null);

    squares.updateSquareLabel(squareId, label);
}

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

const onColorPickerChange = color => color && squares.updateSquareColor(store.getSquareNodeWithColorPicker(), color.toString());

const deleteEntity = event => {
    if (PROTECTED_ENTITIES.indexOf(draggedEntityId) >= 0 ) {
        alert('Not even in your dreams, bitch!')
        return;
    }
    event.preventDefault();

    document.getElementById(draggedEntityId) && document.getElementById(draggedEntityId).remove();

    backend.remove(`entities/${draggedEntityId}`)
}

const showColorPicker = (event, squareId) => {
    if (store.getSquareNodeWithColorPicker() !== squareId && store.getSquareNodeWithLabelPicker() !== squareId) {
        event.preventDefault();

        colorPicker.showColorPicker(squareId, getSquareColor(squareId))
        store.setSquareNodeWithColorPicker(squareId);
    }
}

window.updateSquareLabel = updateSquareLabel;
window.deleteEntity = deleteEntity;