import * as colors from '../services/color-helper.js';
import * as config from '../config/config.js';
import {generateUuid} from '../services/uuid-helper.js';

export const renderPieceCreator = () => {
    const babyOverlay = document.getElementById('baby-overlay');
    const pieceNode = document.createElement('div');
    const uuid = generateUuid();
    babyOverlay.appendChild(pieceNode);
    pieceNode.className = 'player player--new';
    pieceNode.id = uuid;
    pieceNode.textContent = 'New';
    pieceNode.setAttribute('draggable', 'true');
    pieceNode.setAttribute('ondragstart', `drag(event, "${uuid}")`);
    pieceNode.style.color = '#' + colors.getColor(config.defaultPieceColor);
    pieceNode.style.backgroundColor = '#' + config.defaultPieceColor;
};

export const isNew = string => string.length === 36;