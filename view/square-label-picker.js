import * as htmlSelector from '../services/html-selectors.js';
import * as squares from '../state/squares.js';
import * as selectors from '../state/selectors.js';
import * as store from '../state/store.js';

const renderSquareLabelPicker = (squareId) => {
    const squareLabelPicker = document.createElement('input');

    htmlSelector.getSquareNode(squareId).appendChild(squareLabelPicker);
    squareLabelPicker.value = htmlSelector.getSquareNode(squareId).textContent;
    squareLabelPicker.focus();
    squareLabelPicker.select();
    squareLabelPicker.id = 'square-label-picker';
    squareLabelPicker.className = 'square-label-picker';
    squareLabelPicker.setAttribute('onblur', `updateSquareLabel(event, ${squareId})`);
}

export const updateSquareLabel = (event, squareId) => {
    const squareLabelPicker = htmlSelector.getSquareLabelPicker();

    squareLabelPicker.remove();
    squares.updateSquareLabel(squareId, squareLabelPicker.value);
}

export const showSquareLabelPicker = (event, squareId) => {
    event.preventDefault();

    if (selectors.getSquareNodeWithColorPicker() !== squareId && selectors.getSquareNodeWithLabelPicker() !== squareId) {
        store.setSquareNodeWithColorPicker(null);
        store.setSquareNodeWithLabelPicker(squareId);

        renderSquareLabelPicker();
    }
}
