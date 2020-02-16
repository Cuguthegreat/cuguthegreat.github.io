export const render = () => {
    const babyOverlay = document.getElementById('baby-overlay');
    const entityNode = document.createElement('div');

    babyOverlay.appendChild(entityNode);
    entityNode.className = 'player player--new';
    entityNode.id = 'newEntity';
    entityNode.textContent = 'New';
    entityNode.setAttribute('draggable', 'true');
    entityNode.setAttribute('ondragstart', `drag(event, 'newEntity')`);
}