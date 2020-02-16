import * as selectors from '../state/selectors.js';
import {getSquareNode} from '../services/html-selectors.js';

export const renderEntity = squareId => {
    const entityId = `${selectors.getEntityId(squareId)}`;
    const entityNode = document.createElement('div');

    getSquareNode(squareId).appendChild(entityNode);
    entityNode.className = `player player--${selectors.getEntityName(
        squareId
    )}`;
    entityNode.id = entityId;
    entityNode.textContent = `${selectors.getEntityText(squareId)}`;
    entityNode.setAttribute('draggable', 'true');
    entityNode.setAttribute('ondragstart', `drag(event, "${entityId}")`);
};
