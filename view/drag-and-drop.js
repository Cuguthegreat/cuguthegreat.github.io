import * as store from '../state/store.js';
import * as entities from '../state/entities.js';

const isValidDropTarget = (event) => {
    if (event.target.className === 'tombstone-drop-zone') {
        return true
    }

    if (event.target.childElementCount === 0 && (event.target.className === 'grid-item')) {
        return true;
    }
     return false;
}

export const drag = (event, id) => {
    event.dataTransfer.setData("text", event.target.id);
    store.setDraggedEntityId(id);
}

export const allowDrop = (event) => {
    if (isValidDropTarget(event)) {
        event.preventDefault();
    }
}

export const drop = (event, squareId) => {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");

    if (isValidDropTarget(event)) {
        event.target.appendChild(document.getElementById(data));

        entities.updateEntity(store.getDraggedEntityId(), {$set: {position: String(squareId)}})
    }
}
