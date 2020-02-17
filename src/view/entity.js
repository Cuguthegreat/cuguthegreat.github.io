import * as selectors from '../state/selectors.js';
import * as htmlSelectors from '../services/html-selectors.js';

export const renderEntity = entityId => {
    const squareId = `${selectors.getEntityPosition(entityId)}`;
    const entityNode = document.createElement('div');

    htmlSelectors.getSquareNode(squareId).appendChild(entityNode);
    entityNode.className = `player player--${selectors.getEntityName(
        entityId
    )}`;
    entityNode.id = entityId;
    entityNode.textContent = `${selectors.getEntityText(entityId)}`;
    entityNode.setAttribute('draggable', 'true');
    entityNode.setAttribute('ondragstart', `drag(event, "${entityId}")`);
};

export const changeEntityId = (oldEntityId, newEntityId) => {
    const entityNode = htmlSelectors.getEntityNode(oldEntityId);

    entityNode.id = newEntityId;
    entityNode.setAttribute('ondragstart', `drag(event, "${newEntityId}")`);
};
