var ENTITIES = {};
var Squares = {};
var draggedEntityId = null;
var squareNodeWithColorPicker = null;
const NO_COLOR = 'ffffff';

const URL = 'https://pathfinder-battle-map.herokuapp.com';
const HEADERS = {
    'Content-Type': 'application/json',
};

const getSquareNode = squareId => document.getElementById(`grid-item-${squareId}`);

const setSquareColor = (squareId, colorObj) => {
    if (!colorObj) {
        return;
    }
    
    const color = colorObj.toString();

    Squares[squareId] = {...Squares[squareId], color};
    getSquareNode(squareId).style.backgroundColor = '#' + color
};

const updateSquareColor = (squareId, colorObj) => {
    setSquareColor(squareId, colorObj);

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
}

const getSquareColor = squareId => Squares[squareId] && Squares[squareId].color || NO_COLOR;

fetch(`${URL}/api/entities`, {
    method: 'GET',
    headers: HEADERS
})
    .then((response) => response.json())
    .then((data) => {
        setEntities(data);
        render();
    })
    .catch((error) => {
        console.error('Error:', error);
    });

fetch(`${URL}/api/squares`, {
    method: 'GET',
    headers: HEADERS
})
    .then((response) => response.json())
    .then((data) => {
        setSquareColors(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

const setSquareColors = data => {
    for (i in data) {
        const squareId = data[i].squareId;
        
        Squares[squareId] = {color: data[i].color};
        setSquareColor(squareId, data[i].color);
    }
};

function setEntities(data) {
    for (i in data) {
        const key = data[i].position;
        ENTITIES[key] = {id: data[i]._id, name: data[i].name, text: data[i].text};
    }
}

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

    for (i = 0; i < 600; i++) {
        var squareNode = document.createElement('div');
        battleMapNode.appendChild(squareNode);
        squareNode.className = 'grid-item';

        squareNode.id = `grid-item-${i}`;
        squareNode.setAttribute('ondragover', 'allowDrop(event)');
        squareNode.setAttribute('ondrop', `drop(event, ${i})`);
        squareNode.setAttribute('ondblclick', `showColorPicker(event, ${i})`);
    }

    for (squareId in ENTITIES) {
        const entityId = `${ENTITIES[squareId].id}`;
        var entityNode = document.createElement('div');
        document.getElementById(`grid-item-${squareId}`).appendChild(entityNode);
        entityNode.className = `player player--${ENTITIES[squareId].name}`;
        entityNode.id = entityId;
        entityNode.textContent = `${ENTITIES[squareId].text}`;
        entityNode.setAttribute('draggable', 'true');
        entityNode.setAttribute('ondragstart', `drag(event, "${entityId}")`);
    }

    getColorPicker().setAttribute('onchange', 'onColorPickerChange(this.jscolor)');
}

function drag(event, id) {
    event.dataTransfer.setData("text", event.target.id);
    draggedEntityId = id;
}

const isValidDropTarget = (event) => event.target.childElementCount === 0 && (event.target.className === 'grid-item');

function allowDrop(event) {
    if (isValidDropTarget) {
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
