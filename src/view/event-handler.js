import * as multiSelect from './multi-select.js';
import * as htmlSelectors from '../services/html-helper.js';
import * as dragAndDrop from './drag-and-drop.js';
import * as piece from './piece.js';
import * as colorPicker from './color-picker.js';
import * as labelPicker from './label-picker.js';

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

export const addMultiSelectEventListeners = (
    onMousedown,
    onMousemove,
    onMouseup
) => {
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

        if (
            htmlSelectors.isTombstone(target) ||
            htmlSelectors.isCellNode(target)
        ) {
            dragAndDrop.allowDrop(event);
        }
    });

    document.body.addEventListener('dragstart', event => {
        const target = event.target;

        if (htmlSelectors.isPieceNode(target)) {
            dragAndDrop.drag(event, htmlSelectors.getPieceId(target));
        }
    });
};

export const addMouseEventListeners = () => {
    document.body.addEventListener('contextmenu', event => {
        const target = event.target;

        if (htmlSelectors.isPieceNode(target)) {
            colorPicker.showColorPicker(
                event,
                htmlSelectors.getPieceId(target)
            );
        } else if (htmlSelectors.isCellNode(target)) {
            colorPicker.showColorPicker(
                event,
                htmlSelectors.getCellIndex(target)
            );
        }
    });

    document.body.addEventListener('dblclick', event => {
        const target = event.target;

        if (htmlSelectors.isPieceNode(target)) {
            labelPicker.showLabelPicker(
                event,
                htmlSelectors.getPieceId(target)
            );
        } else if (htmlSelectors.isCellNode(target)) {
            labelPicker.showLabelPicker(
                event,
                htmlSelectors.getCellIndex(target)
            );
        }
    });
};
