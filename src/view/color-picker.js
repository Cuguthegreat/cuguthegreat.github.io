import * as htmlSelectors from '../services/html-helper.js';
import * as selectors from '../state/selectors.js';
import * as store from '../state/store.js';
import * as cell from './cell.js';
import * as piece from './piece.js';
import * as colors from '../services/color-helper.js';

const isPiece = () =>
    selectors.isPieceInState(selectors.getCellNodeWithColorPicker());

export const onColorPickerChange = color => {
    isPiece()
        ? piece.changePieceColor(
              selectors.getCellNodeWithColorPicker(),
              colors.getValidPieceColor(color).toString()
          )
        : cell.changeCellColor(
              selectors.getCellNodeWithColorPicker(),
              colors.getValidCellColor(color).toString()
          );
};

const setColorPicker = id => {
    const colorPicker = htmlSelectors.getColorPickerNode();
    const parentNode = selectors.isPieceInState(id)
        ? htmlSelectors.getPieceNode(id)
        : htmlSelectors.getCellNode(id);
    const initialColor = selectors.isPieceInState(id)
        ? selectors.getPieceColor(id)
        : selectors.getCellColor(id);

    parentNode.appendChild(colorPicker);

    colorPicker.jscolor.fromString(initialColor);
    colorPicker.jscolor.hide();

    colorPicker.jscolor.show();
    colorPicker.focus();
    colorPicker.select();
    colorPicker.jscolor.show();
};

export const showColorPicker = (event, id) => {
    event.stopPropagation();

    if (
        selectors.getCellNodeWithColorPicker() !== id &&
        selectors.getCellNodeWithLabelPicker() !== id
    ) {
        event.preventDefault();

        store.setCellNodeWithColorPicker(id);
        setColorPicker(id);
    } else {
        // show browser context-menu
    }
};
