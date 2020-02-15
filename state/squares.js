import * as store from './store.js';
import {getSquareNode} from '../services/html-selectors.js';

const getValidColor = color => color === NO_COLOR ? null : color;

const getValidData = (color, label) => ({...(color && {color}), ...(label && {label})})

const updateSquare = (squareId, data) => {
    store.updateSquare(squareId, data);

    if (data.color) {
        getSquareNode(squareId).style.backgroundColor = '#' + data.color;
    } else {
        getSquareNode(squareId).style.backgroundColor = '#' + store.NO_COLOR;
    }

    if (data.label) {
        getSquareNode(squareId).textContent = data.label;
    } else {
        getSquareNode(squareId).textContent = '';
    }

    if (!data.color && !data.label) {
        store.deleteSquare(squareId);
    }
};

export const updateSquareColor = (squareId, color) => {
    if (color && !store.getSquare(squareId)) {
        backend.create('squares', {squareId, color})
     }

    if (color && store.getSquare(squareId)) {
        if (color === store.getSquareColor(squareId)) {
            return;
        }

        backend.update(`squares/${store.getSquareId(squareId)}`, {$set: {color}})
     }

    if (!color && store.getSquare(squareId) && !store.getSquareLabel(squareId)) {
        backend.remove(`squares/${store.getSquareId(squareId)}`)
    }

    color && updateSquare(squareId, {color});
}

export const updateSquareLabel = (squareId, label) => {
    if (label && !store.getSquare(squareId)) {
        backend.create('squares', {squareId, label})
    }

    if (label && store.getSquare([squareId])) {
        if (label === store.getSquareLabel(squareId)) {
            return;
        }

        backend.update(`squares/${store.getSquareId(squareId)}`, {$set: {label}})
    }

    if (!label && store.getSquareId(squareId) && !store.getSquareColor(squareId)) {
        backend.remove(`squares/${store.getSquareId(squareId)}`)
    }

    label && updateSquare(squareId, {label});
}

export const setSquares = data => {
    for (const i in data) {
        updateSquare(data[i].squareId, {_id: data[i]._id, ...getValidData(data[i].color, data[i].label)});
    }
};