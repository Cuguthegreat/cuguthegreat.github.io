import * as selectors from './selectors.js';
import * as store from './store.js';
import * as htmlSelectors from '../services/html-selectors.js';

const getValidColor = color => color === NO_COLOR ? null : color;

const getValidData = (color, label) => ({...(color && {color}), ...(label && {label})})

const updateSquare = (squareId, data) => {
    const squareNode = htmlSelectors.getSquareNode(squareId)
    const entityNode = squareNode.firstElementChild;

    store.updateSquare(squareId, data);

    if (data.color) {
        squareNode.style.backgroundColor = '#' + data.color;
    } else {
        squareNode.style.backgroundColor = '#' + selectors.NO_COLOR;
    }

    if (data.label) {
        squareNode.textContent = data.label;
    } else {
        squareNode.textContent = '';
    }

    entityNode && squareNode.appendChild(entityNode);

    if (!data.color && !data.label) {
        store.deleteSquare(squareId);
    }
};

export const updateSquareColor = (squareId, color) => {
    if (color && !selectors.getSquare(squareId)) {
        backend.create('squares', {squareId, color})
     }

    if (color && selectors.getSquare(squareId)) {
        if (color === selectors.getSquareColor(squareId)) {
            return;
        }

        backend.update(`squares/${selectors.getSquareId(squareId)}`, {$set: {color}})
     }

    if (!color && selectors.getSquare(squareId) && !selectors.getSquareLabel(squareId)) {
        backend.remove(`squares/${selectors.getSquareId(squareId)}`)
    }

    color && updateSquare(squareId, {color});
}

export const updateSquareLabel = (squareId, label) => {
    store.setSquareNodeWithLabelPicker(null);

    if (label && !selectors.getSquare(squareId)) {
        backend.create('squares', {squareId, label})
    }

    if (label && selectors.getSquare([squareId])) {
        if (label === selectors.getSquareLabel(squareId)) {
            return;
        }

        backend.update(`squares/${selectors.getSquareId(squareId)}`, {$set: {label}})
    }

    if (!label && selectors.getSquareId(squareId) && !selectors.getSquareColor(squareId)) {
        backend.remove(`squares/${selectors.getSquareId(squareId)}`)
    }

    label && updateSquare(squareId, {label});
}

export const setSquares = data => {
    for (const i in data) {
        updateSquare(data[i].squareId, {_id: data[i]._id, ...getValidData(data[i].color, data[i].label)});
    }
};