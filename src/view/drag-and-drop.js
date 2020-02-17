import * as selectors from '../state/selectors.js';
import * as entities from '../state/entities.js';
import * as store from '../state/store.js';
import * as entityCreator from './entity-creator.js';
import * as entity from './entity.js';

const isValidDropTarget = event => {
    if (
        event.target.className === 'tombstone-drop-zone' &&
        !entityCreator.isNew(selectors.getDraggedEntityId)
    ) {
        return true;
    }

    return (
        event.target.childElementCount === 0 &&
        event.target.className === 'grid-item'
    );
};

export const drag = (event, id) => {
    event.dataTransfer.setData('text', event.target.id);
    store.setDraggedEntityId(id);
};

export const allowDrop = event => {
    if (isValidDropTarget(event)) {
        event.preventDefault();
    }
};

export const drop = (event, squareId) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');

    if (isValidDropTarget(event)) {
        event.target.appendChild(document.getElementById(data));
        const draggedEntityId = selectors.getDraggedEntityId();

        if (!selectors.isStateEntity(draggedEntityId)) {
            entities
                .createEntity({
                    uuid: draggedEntityId,
                    name: 'new',
                    text: 'New',
                    position: squareId,
                })
                .then(responseBody =>
                    entity.changeEntityId(responseBody.uuid, responseBody._id)
                );
            entityCreator.renderEntityCreator();
        } else if (!entityCreator.isNew(draggedEntityId)) {
            entities.updateEntity(draggedEntityId, {
                $set: {position: String(squareId)},
            });
        }

        store.updateEntity(draggedEntityId, {position: squareId});
    }
};
