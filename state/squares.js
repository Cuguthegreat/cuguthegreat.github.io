import * as selectors from './selectors.js';
import * as store from './store.js';
import * as htmlSelectors from '../services/html-selectors.js';
import * as backend from '../services/backend-calls.js';


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

const isLabelUnchanged = (squareId, label) => {
    const oldLabel = selectors.getSquareLabel(squareId) || '';

    return oldLabel === label;
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