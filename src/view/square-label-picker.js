import * as htmlSelector from '../services/html-selectors.js';
import * as square from './square.js';
import * as selectors from '../state/selectors.js';
import * as store from '../state/store.js';

const renderSquareLabelPicker = squareId => {
    const squareLabelPicker = document.createElement('input');

    squareLabelPicker.value = selectors.getSquareLabel(squareId);
    squareLabelPicker.id = 'square-label-picker';
    squareLabelPicker.className = 'square-label-picker';
    squareLabelPicker.setAttribute(
        'onblur',
        `onLabelPickerChange(event, ${squareId})`
    );

    htmlSelector.getSquareNode(squareId).appendChild(squareLabelPicker);

    squareLabelPicker.focus();
    squareLabelPicker.select();
};

export const onLabelPickerChange = (event, squareId) => {
    const squareLabelPicker = htmlSelector.getLabelPickerNode();

    squareLabelPicker.remove();
    square.changeSquareLabel(squareId, squareLabelPicker.value);
};

export const showSquareLabelPicker = (event, squareId) => {
    event.preventDefault();

    if (
        selectors.getSquareNodeWithColorPicker() !== squareId &&
        selectors.getSquareNodeWithLabelPicker() !== squareId
    ) {
        store.setSquareNodeWithLabelPicker(squareId);
        renderSquareLabelPicker(squareId);
    }
};
