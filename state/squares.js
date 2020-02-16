import * as selectors from './selectors.js';
import * as store from './store.js';
import * as htmlSelectors from '../services/html-selectors.js';
import * as backend from '../services/backend-calls.js';
import * as config from '../config/config.js';

const getValidData = (color, label) => ({...(color && {color}), ...(label && {label})});

const renderSquare = (squareId) => {
    const squareNode = htmlSelectors.getSquareNode(squareId);
    const entityNode = squareNode.firstElementChild;

    squareNode.style.backgroundColor = '#' + selectors.getSquareColor(squareId);
    squareNode.textContent = selectors.getSquareLabel(squareId);
    entityNode && squareNode.appendChild(entityNode);
};

const isColorUnchanged = (squareId, color) => {
    const oldColor = selectors.getSquareColor(squareId) || config.defaultSquareColor;
    const newColor = color || config.defaultSquareColor;

    return oldColor === newColor;
};

const isValidColor = color => color && color !== config.defaultSquareColor;

export const updateSquareColor = (squareId, color) => {
    store.setSquareNodeWithColorPicker(null);

    if (!squareId) {
        backend.throwError('SquareId is invalid.');
        return;
    }

    if (isColorUnchanged(squareId, color)) {
        return;
    }

    if (isValidColor(color) && !selectors.getSquare(squareId)) {
        backend.create('squares', {squareId, color})
    }

    if (isValidColor(color) && selectors.getSquare(squareId)) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {$set: {color}})
    }

    if (!isValidColor(color) && !selectors.isSquareLabeled(squareId)) {
        backend.remove(`squares/${selectors.getSquareId(squareId)}`)
    }

    if (!isValidColor(color) && selectors.isSquareLabeled(squareId)) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {$unset: {color}})
    }

    store.updateSquare(squareId, {color});
    renderSquare(squareId);
};

const isLabelUnchanged = (squareId, label) => {
    const oldLabel = selectors.getSquareLabel(squareId) || '';
    const newLabel = label || '';

    return oldLabel === newLabel;
};

export const updateSquareLabel = (squareId, label) => {
    store.setSquareNodeWithLabelPicker(null);

    if (!squareId) {
        backend.throwError('SquareId is invalid.');
        return;
    }

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
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {$unset: {label}})
    }

    store.updateSquare(squareId, {label});
    renderSquare(squareId);
};

export const setSquares = data => {
    for (const i in data) {
        const squareId = data[i].squareId;
        const squareData = {_id: data[i]._id, ...getValidData(data[i].color, data[i].label)};

        store.updateSquare(squareId, squareData);
        renderSquare(squareId);
    }
};