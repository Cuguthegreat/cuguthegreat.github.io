import * as htmlSelectors from '../services/html-selectors.js';
import * as selectors from '../state/selectors.js';
import {updateSquareColor, updateSquareLabel} from '../state/squares.js';

const updateSquareNode = squareId => {
    const squareNode = htmlSelectors.getSquareNode(squareId);
    const entityNode = squareNode.firstElementChild;

    squareNode.style.backgroundColor = '#' + selectors.getSquareColor(squareId);
    squareNode.textContent = selectors.getSquareLabel(squareId);
    entityNode && squareNode.appendChild(entityNode);
};

export const renderSquare = squareId => {
    const squareNode = document.createElement('div');

    htmlSelectors.getBattleMapNode().appendChild(squareNode);
    squareNode.className = 'grid-item';
    squareNode.id = `grid-item-${squareId}`;
    squareNode.setAttribute('ondragover', 'allowDrop(event)');
    squareNode.setAttribute('ondrop', `drop(event, ${squareId})`);
    squareNode.setAttribute(
        'oncontextmenu',
        `showColorPicker(event, ${squareId})`
    );
    squareNode.setAttribute(
        'ondblclick',
        `showLabelPicker(event, ${squareId})`
    );

    updateSquareNode(squareId);
};

export const changeSquareColor = (squareId, color) => {
    updateSquareColor(squareId, color);
    updateSquareNode(squareId);
};

export const changeSquareLabel = (squareId, label) => {
    updateSquareLabel(squareId, label);
    updateSquareNode(squareId);
};
