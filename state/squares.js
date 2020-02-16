import * as selectors from './selectors.js';
import * as store from './store.js';
import * as htmlSelectors from '../services/html-selectors.js';
import * as backend from '../services/backend-calls.js';
import * as config from '../config/config.js';

const getValidColor = color => color === config.defaultSquareColor ? null : color;

const getValidData = (color, label) => ({...(color && {color}), ...(label && {label})})

const updateSquare = (squareId, data) => {
    const squareNode = htmlSelectors.getSquareNode(squareId)
    const entityNode = squareNode.firstElementChild;

    store.updateSquare(squareId, data);

    if (data.color) {
        squareNode.style.backgroundColor = '#' + data.color;
    } else {
        squareNode.style.backgroundColor = '#' + config.defaultSquareColor;
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

const isColorUnchanged = (squareId, color) => {
    const oldColor = selectors.getSquareColor(squareId) || config.defaultSquareColor;
    const newColor = color || config.defaultSquareColor;

    return oldColor === color;
}

export const updateSquareColor = (squareId, color) => {
    store.setSquareNodeWithColorPicker(null);

    if (isColorUnchanged(squareId, color)) {
        return;
    }

    if (color && !selectors.getSquare(squareId)) {
        backend.create('squares', {squareId, color})
     }

    if (color && selectors.getSquare(squareId)) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {$set: {color}})
    }

    if (!color && !selectors.isSquareLabeled(squareId)) {
        backend.remove(`squares/${selectors.getSquareId(squareId)}`)
    }

    if (!color && selectors.isSquareLabeled(squareId)) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {$set: {color}})
    }

    updateSquare(squareId, {color});
}

const isLabelUnchanged = (squareId, label) => {
    const oldLabel = selectors.getSquareLabel(squareId) || '';
    const newLabel = label || '';

    return oldLabel === newLabel;
}

export const updateSquareLabel = (squareId, label) => {
    store.setSquareNodeWithLabelPicker(null);

    if (isLabelUnchanged(squareId, label)) {
        return;
    }

    if (label && !selectors.getSquare(squareId)) {
        backend.create('squares', {squareId, label})
    }

    if (label && selectors.getSquare([squareId])) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {$set: {label}})
    }

    if (!label && !selectors.isSquareColored(squareId)) {
        backend.remove(`squares/${selectors.getSquareId(squareId)}`)
    }

    if (!label && selectors.isSquareColored(squareId)) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {$set: {label}})
    }

    updateSquare(squareId, {label});
}

export const setSquares = data => {
    for (const i in data) {
        updateSquare(data[i].squareId, {_id: data[i]._id, ...getValidData(data[i].color, data[i].label)});
    }
};