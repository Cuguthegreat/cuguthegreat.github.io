import {getSquareLabelPicker} from '../services/html-selectors.js';
import * as squares from '../state/squares.js';

const renderSquareLabelPicker = (squareId) => {
    const squareLabelPicker = document.createElement('input');

    getSquareNode(squareId).appendChild(squareLabelPicker);
    squareLabelPicker.value = getSquareNode(squareId).textContent;
    squareLabelPicker.focus();
    squareLabelPicker.select();
    squareLabelPicker.id = 'square-label-picker';
    squareLabelPicker.className = 'square-label-picker';
    squareLabelPicker.setAttribute('onblur', `updateSquareLabel(event, ${squareId})`);
}

const updateSquareLabel = (event, squareId) => {
    const squareLabelPicker = getSquareLabelPicker();
    const label = squareLabelPicker.value;

    squareLabelPicker.remove();

    squares.updateSquareLabel(squareId, label);
}

export const showSquareLabelPicker = (event, squareId) => {
    event.preventDefault();

    if (squareNodeWithColorPicker !== squareId && squareNodeWithLabelPicker !== squareId) {
        squareNodeWithColorPicker = null
        squareNodeWithLabelPicker = squareId;
        renderSquareLabelPicker();
    }
}

window.updateSquareLabel = updateSquareLabel;
