import * as htmlSelectors from '../services/html-helper.js';
import * as selectors from '../state/selectors.js';
import {updateCellColor, updateCellLabel} from '../state/cells.js';
import * as multiSelect from './multi-select.js';
import * as events from './event-handler.js';

export const updateCellNode = cellIndex => {
    const cellNode = htmlSelectors.getCellNode(cellIndex);
    const pieceNode = cellNode.firstElementChild;

    cellNode.textContent = selectors.getCellLabel(cellIndex);
    cellNode.style.backgroundColor = '#' + selectors.getCellColor(cellIndex);
    pieceNode && cellNode.appendChild(pieceNode);
};

export const renderCell = cellIndex => {
    const cellNode = document.createElement('div');

    htmlSelectors.getBattleMapNode().appendChild(cellNode);
    cellNode.className = `cell cell--${cellIndex}`;
    cellNode.id = `cell-${cellIndex}`;
    events.addCellEventListeners(cellNode, cellIndex);

    updateCellNode(cellIndex);
};

export const changeCellColor = (cellIndex, color) => {
    updateCellColor(cellIndex, color);
    updateCellNode(cellIndex);

    if (selectors.isMultiSelectActive()) {
        selectors.getMultiSelectCellIndices().forEach((multiSelectCellIndex) => {
            updateCellColor(multiSelectCellIndex, color);
            updateCellNode(multiSelectCellIndex);
        });
        
        multiSelect.clearMultiSelect();
    }
};


export const changeCellLabel = (cellIndex, label) => {
    updateCellLabel(cellIndex, label);
    updateCellNode(cellIndex);

    if (selectors.isMultiSelectActive()) {
        selectors.getMultiSelectCellIndices().forEach((multiSelectCellIndex) => {
            updateCellLabel(multiSelectCellIndex, label);
            updateCellNode(multiSelectCellIndex);
        });

        multiSelect.clearMultiSelect();
    }
};
