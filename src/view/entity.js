import * as selectors from '../state/selectors.js';
import * as htmlSelectors from '../services/html-selectors.js';
import * as entities from '../state/entities.js';
import * as config from '../config/config.js';
import * as colors from '../services/colors.js';

const updateEntityNode = entityId => {
    const entityNode = htmlSelectors.getEntityNode(entityId);

    entityNode.textContent = selectors.getEntityName(entityId);
    entityNode.style.color =
        '#' + colors.getColor(selectors.getEntityColor(entityId));
    entityNode.style.backgroundColor = '#' + selectors.getEntityColor(entityId);
};

export const renderEntity = entityId => {
    const squareId = `${selectors.getEntityPosition(entityId)}`;
    const entityNode = document.createElement('div');

    htmlSelectors.getSquareNode(squareId).appendChild(entityNode);
    entityNode.className = `player player--${selectors.getEntityName(
        entityId
    )}`;
    entityNode.id = entityId;
    entityNode.setAttribute('draggable', 'true');
    entityNode.setAttribute('ondragstart', `drag(event, "${entityId}")`);
    entityNode.setAttribute(
        'oncontextmenu',
        `showColorPicker(event, "${entityId}")`
    );
    entityNode.setAttribute(
        'ondblclick',
        `showLabelPicker(event, "${entityId}")`
    );

    updateEntityNode(entityId);
};

export const changeEntityId = (oldEntityId, newEntityId) => {
    const entityNode = htmlSelectors.getEntityNode(oldEntityId);

    entityNode.id = newEntityId;
    entityNode.setAttribute('ondragstart', `drag(event, "${newEntityId}")`);
    entityNode.setAttribute(
        'oncontextmenu',
        `showColorPicker(event, "${newEntityId}")`
    );
    entityNode.setAttribute(
        'ondblclick',
        `showLabelPicker(event, "${newEntityId}")`
    );
};

export const changeEntityColor = (entityId, color) => {
    if (config.protectedEntities.indexOf(entityId) >= 0) {
        alert('Not even in your dreams, bitch!');
    } else {
        entities.updateEntityColor(entityId, color);
        updateEntityNode(entityId);
    }
};

export const changeEntityName = (entityId, label) => {
    if (config.protectedEntities.indexOf(entityId) >= 0) {
        alert('Not even in your dreams, bitch!');
    } else {
        entities.updateEntityName(entityId, label);
        updateEntityNode(entityId);
    }
};
