var ENTITIES = {
    25: {id: 'finn', name: 'finn', text: 'Finn'},
    28: {id: 'solveig', name: 'solveig', text: 'Solveig'},
    30: {id: 'rats01', name: 'rats', text: 'Rats'},
    566: {id: 'pig01', name: 'pig', text: 'Pig'},
    548: {id: 'pig02', name: 'pig', text: 'Pig'},
    570: {id: 'pig03', name: 'pig', text: 'Pig'}
};

setTimeout(render, 0);

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
		squareNode.setAttribute('ondrop', 'drop(event, i)');
	}

	for (squareId in ENTITIES) {
		var entityNode = document.createElement("div");
		document.getElementById(`grid-item-${squareId}`).appendChild(entityNode);
		entityNode.className = `player player--${ENTITIES[squareId].name}`;
		entityNode.id = `${ENTITIES[squareId].id}`;
		entityNode.textContent = `${ENTITIES[squareId].text}`;
		entityNode.setAttribute('draggable', 'true');
		entityNode.setAttribute('ondragstart', 'drag(event)');
	}
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    if (event.target.childElementCount == 0 && event.target.className == "grid-item") {
        event.preventDefault();
    }
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    if (event.target.childElementCount == 0 && event.target.className == "grid-item") {
        event.target.appendChild(document.getElementById(data));
    }
}