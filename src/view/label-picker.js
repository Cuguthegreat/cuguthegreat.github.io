import * as htmlSelector from '../services/html-helper.js';
import * as cell from './cell.js';
import * as selectors from '../state/selectors.js';
import * as store from '../state/store.js';
import * as piece from './piece.js';

const renderLabelPicker = id => {
    const cellLabelPicker = document.createElement('input');

    cellLabelPicker.value = selectors.isPieceInState(id)
        ? selectors.getPieceName(id)
        : selectors.getCellLabel(id);
    cellLabelPicker.id = 'cell-label-picker';
    cellLabelPicker.className = 'cell-label-picker';
    cellLabelPicker.setAttribute('onblur', `onLabelChange(event, "${id}")`);

    selectors.isPieceInState(id)
        ? htmlSelector.getPieceNode(id).appendChild(cellLabelPicker)
        : htmlSelector.getCellNode(id).appendChild(cellLabelPicker);

    cellLabelPicker.focus();
    cellLabelPicker.select();
};

export const onLabelChange = (event, id) => {
    const labelPicker = htmlSelector.getLabelPickerNode();

    labelPicker.remove();
    selectors.isPieceInState(id)
        ? piece.changePieceName(id, labelPicker.value)
        : cell.changeCellLabel(id, labelPicker.value);
};

export const showLabelPicker = (event, id) => {
    event.preventDefault();
    event.stopPropagation();

    if (
        selectors.getCellNodeWithColorPicker() !== id &&
        selectors.getCellNodeWithLabelPicker() !== id
    ) {
        store.setCellNodeWithLabelPicker(id);
        renderLabelPicker(id);
    }
};
