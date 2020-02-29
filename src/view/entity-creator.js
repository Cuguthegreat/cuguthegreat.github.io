import * as colors from '../services/color-helper.js';
import * as config from '../config/config.js';
import {generateUuid} from '../services/uuid-helper.js';

export const renderEntityCreator = () => {
    const babyOverlay = document.getElementById('baby-overlay');
    const entityNode = document.createElement('div');
    const uuid = generateUuid();
    babyOverlay.appendChild(entityNode);
    entityNode.className = 'player player--new';
    entityNode.id = uuid;
    entityNode.textContent = 'New';
    entityNode.setAttribute('draggable', 'true');
    entityNode.setAttribute('ondragstart', `drag(event, "${uuid}")`);
    entityNode.style.color = '#' + colors.getColor(config.defaultEntityColor);
    entityNode.style.backgroundColor = '#' + config.defaultEntityColor;
};

export const isNew = string => string.length === 36;
