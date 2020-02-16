import * as htmlSelectors from '../services/html-selectors.js';

export const renderSquare = (squareId) => {
    const squareNode = document.createElement('div');

    htmlSelectors.getBattleMapNode().appendChild(squareNode);
    squareNode.className = 'grid-item';
    squareNode.id = `grid-item-${squareId}`;
    squareNode.setAttribute('ondragover', 'allowDrop(event)');
    squareNode.setAttribute('ondrop', `drop(event, ${squareId})`);
    squareNode.setAttribute('oncontextmenu', `showColorPicker(event, ${squareId})`);
    squareNode.setAttribute('ondblclick', `showSquareLabelPicker(event, ${squareId})`);
};
