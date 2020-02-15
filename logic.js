import {getTombstone, getSquareNode} from './services/html-selectors.js';
import * as backend from './services/backend-calls.js';
import * as colorPicker from './services/color-picker.js';
import * as squares from './state/squares.js';

var ENTITIES = {};
var draggedEntityId = null;
var squareNodeWithColorPicker = null;
var squareNodeWithLabelPicker = null;

const PROTECTED_ENTITIES = ['5e409e27ee7ee6001715c7b4', '5e409e27ee7ee6001715c7b3', '5e409e27ee7ee6001715c7b2'];

const updateSquareLabel = (event, squareId) => {
    const squareLabelPicker = getSquareLabelPicker();
    const label = squareLabelPicker.value;

    squareLabelPicker.remove();
    squareNodeWithLabelPicker = null;

    squares.updateSquareLabel(squareId, label);
}

const setEntities = data => {
    for (const i in data) {
        const key = data[i].position;

        ENTITIES[key] = {id: data[i]._id, name: data[i].name, text: data[i].text};
    }
}

Promise.all([
        backend.read('entities'),
        backend.read('squares')
    ])
    .then(([entitiesData, squaresData]) => {
        setEntities(entitiesData);
        render();
        squares.setSquares(squaresData);
    })

var socket = io.connect(backend.URL);
socket.on('update', function (data) {
    const id = data.documentKey._id;
    const update = data.updateDescription && data.updateDescription.updatedFields;

    if (update && update.position) {
        document.getElementById(`grid-item-${update.position}`).appendChild(
            document.getElementById(`${id}`)
        );
    }
});

const onColorPickerChange = color => color && squares.updateSquareColor(squareNodeWithColorPicker, color.toString());

const render = () => {
    var battleMapNode = document.createElement('div');
    document.body.appendChild(battleMapNode);
    battleMapNode.id = 'battle-map';
    battleMapNode.className = 'grid-container';

    for (let i = 0; i < 600; i++) {
        var squareNode = document.createElement('div');
        battleMapNode.appendChild(squareNode);
        squareNode.className = 'grid-item';

        squareNode.id = `grid-item-${i}`;
        squareNode.setAttribute('ondragover', 'allowDrop(event)');
        squareNode.setAttribute('ondrop', `drop(event, ${i})`);
        squareNode.setAttribute('oncontextmenu', `showColorPicker(event, ${i})`);
        squareNode.setAttribute('ondblclick', `showSquareLabelPicker(event, ${i})`);
    }

    for (const squareId in ENTITIES) {
        const entityId = `${ENTITIES[squareId].id}`;
        const entityNode = document.createElement('div');
        document.getElementById(`grid-item-${squareId}`).appendChild(entityNode);
        entityNode.className = `player player--${ENTITIES[squareId].name}`;
        entityNode.id = entityId;
        entityNode.textContent = `${ENTITIES[squareId].text}`;
        entityNode.setAttribute('draggable', 'true');
        entityNode.setAttribute('ondragstart', `drag(event, "${entityId}")`);
    }

    getTombstone().setAttribute('ondragover', 'allowDrop(event)');
    getTombstone().setAttribute('ondrop', 'deleteEntity(event)');

    colorPicker.getColorPicker().setAttribute('onchange', 'onColorPickerChange(this.jscolor)');
}

const drag = (event, id) => {
    event.dataTransfer.setData("text", event.target.id);
    draggedEntityId = id;
}

const isValidDropTarget = (event) => {
    if (event.target.className === 'tombstone-drop-zone') {
        return true
    }

    if (event.target.childElementCount === 0 && (event.target.className === 'grid-item')) {
        return true;
    }
     return false;
}

const allowDrop = (event) => {
    if (isValidDropTarget(event)) {
        event.preventDefault();
    }
}

const drop = (event, squareId) => {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");

    if (isValidDropTarget(event)) {
        event.target.appendChild(document.getElementById(data));

        backend.update(`entities/${draggedEntityId}`, {$set: {position: String(squareId)}})
    }
}

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
    if (squareNodeWithColorPicker !== squareId && squareNodeWithLabelPicker !== squareId) {
        event.preventDefault();
        squareNodeWithLabelPicker = null;

        colorPicker.showColorPicker(squareId, getSquareColor(squareId))
        squareNodeWithColorPicker = squareId;
    }
}

const getSquareLabelPicker = () => document.getElementById('square-label-picker');

const showSquareLabelPicker = (event, squareId) => {
    event.preventDefault();

    if (squareNodeWithColorPicker !== squareId && squareNodeWithLabelPicker !== squareId) {
        event.preventDefault();
        squareNodeWithColorPicker = null

        const squareLabelPicker = document.createElement('input');

        getSquareNode(squareId).appendChild(squareLabelPicker);
        squareLabelPicker.value = getSquareNode(squareId).textContent;
        squareLabelPicker.focus();
        squareLabelPicker.select();
        squareLabelPicker.id = 'square-label-picker';
        squareLabelPicker.className = 'square-label-picker';
        squareLabelPicker.setAttribute('onblur', `updateSquareLabel(event, ${squareId})`);

        squareNodeWithLabelPicker = squareId;
    }
}

window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;
window.showColorPicker = showColorPicker;
window.showSquareLabelPicker = showSquareLabelPicker;
window.updateSquareLabel = updateSquareLabel;
window.deleteEntity = deleteEntity;
window.onColorPickerChange = onColorPickerChange;