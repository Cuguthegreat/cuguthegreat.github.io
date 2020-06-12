import * as multiSelect from './multi-select.js';
import * as htmlSelectors from '../services/html-helper.js';
import * as dragAndDrop from './drag-and-drop.js';
import * as piece from './piece.js';

const activateMultiSelect = (onMousedown, onMousemove, onMouseup) => {
    document.body.addEventListener('mousedown', onMousedown);
    document.body.addEventListener('mousemove', onMousemove);
    document.body.addEventListener('mouseup', onMouseup, true);
};

const deactivateMultiSelect = (onMousedown, onMousemove, onMouseup) => {
    document.body.removeEventListener('mousedown', onMousedown);
    document.body.removeEventListener('mousemove', onMousemove);
    document.body.removeEventListener('mouseup', onMouseup, true);
};

export const addMultiSelectEventListeners = (onMousedown, onMousemove, onMouseup) => {
    document.body.addEventListener('keydown', event => {
        if (event.key === 'Control') {
            activateMultiSelect(onMousedown, onMousemove, onMouseup);
        } else if (event.key === 'Escape') {
            multiSelect.clearMultiSelect();
        }
    });

    document.body.addEventListener('keyup', event => {
        if (event.key === 'Control') {
            deactivateMultiSelect(onMousedown, onMousemove, onMouseup);
        }
    });
};

export const addDragAndDropEventListeners = () => {
    document.body.addEventListener('drop', event => {
        const target = event.target;

        if (htmlSelectors.isTombstone(target)) {
            piece.deletePiece(event);
        } else if (htmlSelectors.isCellNode(target)) {
            dragAndDrop.drop(event, htmlSelectors.getCellIndex(target));
        }
    });

    document.body.addEventListener('dragover', event => {
        const target = event.target;

        if (htmlSelectors.isTombstone(target) || htmlSelectors.isCellNode(target)) {
            dragAndDrop.allowDrop(event);
        }
    });
};

export const addCellEventListeners = (cellNode, cellIndex) => {
    cellNode.setAttribute(
        'oncontextmenu',
        `showColorPicker(event, ${cellIndex})`,
    );
    cellNode.setAttribute(
        'ondblclick',
        `showLabelPicker(event, ${cellIndex})`,
    );
};
