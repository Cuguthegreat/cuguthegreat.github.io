import {getSquareNode} from './html-selectors.js';

export const getColorPicker = () => document.getElementById('jscolor');

export const showColorPicker = (squareId, initialColor) => {
    const colorPicker = getColorPicker();

    getSquareNode(squareId).appendChild(colorPicker);

    colorPicker.jscolor.fromString(initialColor);
    colorPicker.jscolor.hide();

    colorPicker.jscolor.show();
    colorPicker.focus();
    colorPicker.select();
    colorPicker.jscolor.show();
};