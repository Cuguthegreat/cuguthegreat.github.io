import * as selectors from '../state/selectors.js';
import {getSquareNode} from '../services/html-selectors.js';

export const renderEntity = entityId => {
    const squareId = `${selectors.getEntityPosition(entityId)}`;
    const entityNode = document.createElement('div');

    getSquareNode(squareId).appendChild(entityNode);
    entityNode.className = `player player--${selectors.getEntityName(
        entityId
    )}`;
    entityNode.id = entityId;
    entityNode.textContent = `${selectors.getEntityText(entityId)}`;
    entityNode.setAttribute('draggable', 'true');
    entityNode.setAttribute('ondragstart', `drag(event, "${entityId}")`);
};
