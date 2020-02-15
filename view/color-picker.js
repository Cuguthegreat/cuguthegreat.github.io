import {getSquareNode, getColorPicker} from '../services/html-selectors.js';
import * as selectors from '../state/selectors.js';

export const onColorPickerChange = color => color && squares.updateSquareColor(selectors.getSquareNodeWithColorPicker(), color.toString());

const renderColorPicker = (squareId, initialColor) => {
    const colorPicker = getColorPicker();

    getSquareNode(squareId).appendChild(colorPicker);

    colorPicker.jscolor.fromString(initialColor);
    colorPicker.jscolor.hide();

    colorPicker.jscolor.show();
    colorPicker.focus();
    colorPicker.select();
    colorPicker.jscolor.show();
}

export const showColorPicker = (event, squareId) => {
    event.preventDefault();

    if (selectors.getSquareNodeWithColorPicker() !== squareId && selectors.getSquareNodeWithLabelPicker() !== squareId) {

        selectors.setSquareNodeWithColorPicker(squareId);

        renderColorPicker(squareId, getSquareColor(squareId));
    }
}
