import * as htmlSelectors from '../services/html-selectors.js';
import * as selectors from '../state/selectors.js';
import * as store from '../state/store.js';
import * as squares from '../state/squares.js';

export const onColorPickerChange = color => color && squares.updateSquareColor(selectors.getSquareNodeWithColorPicker(), color.toString());

const renderColorPicker = (squareId, initialColor) => {
    const colorPicker = htmlSelectors.getColorPickerNode();

    htmlSelectors.getSquareNode(squareId).appendChild(colorPicker);

    colorPicker.jscolor.fromString(initialColor);
    colorPicker.jscolor.hide();

    colorPicker.jscolor.show();
    colorPicker.focus();
    colorPicker.select();
    colorPicker.jscolor.show();
};

export const showColorPicker = (event, squareId) => {
    if (selectors.getSquareNodeWithColorPicker() !== squareId && selectors.getSquareNodeWithLabelPicker() !== squareId) {
        event.preventDefault();

        store.setSquareNodeWithColorPicker(squareId);
        renderColorPicker(squareId, selectors.getSquareColor(squareId));
    } else {
        // show browser context-menu
    }
};
