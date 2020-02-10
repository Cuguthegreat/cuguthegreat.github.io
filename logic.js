var ENTITIES = {};

fetch('https://pathfinder-battle-map.herokuapp.com/api/entities', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then((response) => response.json())
    .then((data) => {
        setEntities(data);
        render();
    })
    .catch((error) => {
        console.error('Error:', error);
    });

function setEntities(data) {
    for (i in data) {
        const key = data[i].position;
        ENTITIES[key] = {id: data[i]._id, name: data[i].name, text: data[i].text};
    }
}

var socket = io.connect('https://pathfinder-battle-map.herokuapp.com');
socket.on('update', function (data) {
    const id = data.documentKey._id;
    const update = data.updateDescription.updatedFields;
    if (update.position) {
        document.getElementById(`grid-item-${update.position}`).appendChild(
            document.getElementById(`${id}`)
        );
    }
});

var draggedEntityId = null;

function render() {
    var battleMapNode = document.createElement('div');
    document.body.appendChild(battleMapNode);
    battleMapNode.id = 'battle-map';
    battleMapNode.className = 'grid-container';

    for (i = 0; i < 600; i++) {
        var squareNode = document.createElement("div");
        battleMapNode.appendChild(squareNode);
        squareNode.className = 'grid-item';
        squareNode.id = `grid-item-${i}`;
        squareNode.setAttribute('ondragover', 'allowDrop(event)');
        squareNode.setAttribute('ondrop', `drop(event, ${i})`);
    }

    for (squareId in ENTITIES) {
        const entityId = `${ENTITIES[squareId].id}`;
        var entityNode = document.createElement("div");
        document.getElementById(`grid-item-${squareId}`).appendChild(entityNode);
        entityNode.className = `player player--${ENTITIES[squareId].name}`;
        entityNode.id = entityId;
        entityNode.textContent = `${ENTITIES[squareId].text}`;
        entityNode.setAttribute('draggable', 'true');
        entityNode.setAttribute('ondragstart', `drag(event, "${entityId}")`);
    }
}

function drag(event, id) {
    event.dataTransfer.setData("text", event.target.id);
    draggedEntityId = id;
}

function allowDrop(event) {
    if (event.target.childElementCount === 0 && event.target.className === "grid-item") {
        event.preventDefault();
    }
}

function drop(event, squareId) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    if (event.target.childElementCount === 0 && event.target.className === "grid-item") {
        event.target.appendChild(document.getElementById(data));
    }

    const body = {$set: {position: String(squareId)}};

    fetch(`https://pathfinder-battle-map.herokuapp.com/api/entities/${draggedEntityId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}