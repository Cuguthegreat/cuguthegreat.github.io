const generate = () => {
    var d = new Date().getTime();
    var d2 = performance && performance.now && (performance.now() * 1000) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

export const renderEntityCreator = () => {
    const babyOverlay = document.getElementById('baby-overlay');
    const entityNode = document.createElement('div');
    const uuid = generate();
    babyOverlay.appendChild(entityNode);
    entityNode.className = 'player player--new';
    entityNode.id = uuid;
    entityNode.textContent = 'New';
    entityNode.setAttribute('draggable', 'true');
    entityNode.setAttribute('ondragstart', `drag(event, "${uuid}")`);
};

export const isNew = string => string.length === 36;