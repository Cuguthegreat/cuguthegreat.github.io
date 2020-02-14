import {getTombstone, getSquareNode} from './get-element.js';
import {URL, HEADERS, fetchAll} from './backend/backend-calls.js';

var ENTITIES = {};
var Squares = {};
var draggedEntityId = null;
var squareNodeWithColorPicker = null;
const NO_COLOR = 'ffffff';

const PROTECTED_ENTITIES = ['5e409e27ee7ee6001715c7b4', '5e409e27ee7ee6001715c7b3', '5e409e27ee7ee6001715c7b2'];

const setSquareColor = (squareId, colorObj) => {
    if (!colorObj) {
        return;
    }
    
    const color = colorObj.toString();

    Squares[squareId] = {...Squares[squareId], color};
    getSquareNode(squareId).style.backgroundColor = '#' + color
};

const updateSquareColor = (squareId, colorObj) => {
    if (!colorObj) {
        return;
    }

    const color = colorObj.toString();

    if (Squares[squareId]) {
        const body = {$set: {color}};

        fetch(`${URL}/api/squares/${squareId}`, {
            method: 'PUT',
            headers: HEADERS,
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        const body = {squareId, color};

        fetch(`${URL}/api/squares`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    setSquareColor(squareId, colorObj);
}

const getSquareColor = squareId => Squares[squareId] && Squares[squareId].color || NO_COLOR;

const setSquareColors = data => {
    for (const i in data) {
        const squareId = data[i].squareId;
        const color = data[i].color;

        Squares[squareId] = {color};
        setSquareColor(squareId, color);
    }
};

const setEntities = data => {
    for (const i in data) {
        const key = data[i].position;

        ENTITIES[key] = {id: data[i]._id, name: data[i].name, text: data[i].text};
    }
}

Promise.all([
        fetchAll('entities'),
        fetchAll('squares')
    ])
    .then(([entitiesData, squaresData]) => {
        setEntities(entitiesData);
        render();
        setSquareColors(squaresData);
    })

var socket = io.connect(URL);
socket.on('update', function (data) {
    const id = data.documentKey._id;
    const update = data.updateDescription && data.updateDescription.updatedFields;

    if (update && update.position) {
        document.getElementById(`grid-item-${update.position}`).appendChild(
            document.getElementById(`${id}`)
        );
    }
});

const getColorPicker = () => document.getElementById('jscolor');

const showColorPicker = (event, squareId) => {
    const colorPicker = getColorPicker();

    getSquareNode(squareId).appendChild(colorPicker);
    squareNodeWithColorPicker = squareId;

    colorPicker.jscolor.fromString(getSquareColor(squareId));
    colorPicker.jscolor.hide();

    colorPicker.jscolor.show();
    colorPicker.focus();
    colorPicker.jscolor.show();
};

const onColorPickerChange = color => updateSquareColor(squareNodeWithColorPicker, color);

function render() {
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
        squareNode.setAttribute('ondblclick', `showColorPicker(event, ${i})`);
    }

    for (const squareId in ENTITIES) {
        const entityId = `${ENTITIES[squareId].id}`;
        var entityNode = document.createElement('div');
        document.getElementById(`grid-item-${squareId}`).appendChild(entityNode);
        entityNode.className = `player player--${ENTITIES[squareId].name}`;
        entityNode.id = entityId;
        entityNode.textContent = `${ENTITIES[squareId].text}`;
        entityNode.setAttribute('draggable', 'true');
        entityNode.setAttribute('ondragstart', `drag(event, "${entityId}")`);
    }

    getTombstone().setAttribute('ondragover', 'allowDrop(event)');
    getTombstone().setAttribute('ondrop', 'deleteEntity(event)');

    getColorPicker().setAttribute('onchange', 'onColorPickerChange(this.jscolor)');
}

function drag(event, id) {
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

function allowDrop(event) {
    if (isValidDropTarget(event)) {
        event.preventDefault();
    }
}

function drop(event, squareId) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");

    if (isValidDropTarget(event)) {
        event.target.appendChild(document.getElementById(data));


        const body = {$set: {position: String(squareId)}};

        fetch(`${URL}/api/entities/${draggedEntityId}`, {
            method: 'PUT',
            headers: HEADERS,
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

const deleteEntity = event => {
    if (PROTECTED_ENTITIES.indexOf(draggedEntityId) >= 0 ) {
        alert('Not even in your dreams, bitch!')
        return;
    }
    event.preventDefault();

    document.getElementById(draggedEntityId) && document.getElementById(draggedEntityId).remove();

        fetch(`${URL}/api/entities/${draggedEntityId}`, {
            method: 'DELETE',
            headers: HEADERS
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
}

window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;
window.showColorPicker = showColorPicker;
window.deleteEntity = deleteEntity;
window.onColorPickerChange = onColorPickerChange;