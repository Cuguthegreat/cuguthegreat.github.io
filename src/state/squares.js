import * as selectors from './selectors.js';
import * as store from './store.js';
import * as backend from '../services/backend-calls.js';
import * as config from '../config/config.js';
import * as html from '../services/html-selectors.js';

const getValidData = (color, label) => ({
    ...(color && {color}),
    ...(label && {label}),
});

const isColorUnchanged = (squareId, color) => {
    const oldColor =
        selectors.getSquareColor(squareId) || config.defaultSquareColor;
    const newColor = color || config.defaultSquareColor;

    return oldColor === newColor;
};

const isValidColor = color => color && color !== config.defaultSquareColor;

export const updateSquareColor = (squareId, color) => {
    store.setSquareNodeWithColorPicker(null);
    html.getColorPickerNode().jscolor.hide();

    if (!squareId) {
        backend.throwError('Square id for color update is invalid.');
        return;
    }

    if (isColorUnchanged(squareId, color)) {
        return;
    }

    if (isValidColor(color) && !selectors.getSquare(squareId)) {
        backend.create('squares', {squareId, color});
    }

    if (isValidColor(color) && selectors.getSquare(squareId)) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {
            $set: {color},
        });
    }

    if (!isValidColor(color) && !selectors.isSquareLabeled(squareId)) {
        backend.remove(`squares/${selectors.getSquareId(squareId)}`);
    }

    if (!isValidColor(color) && selectors.isSquareLabeled(squareId)) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {
            $unset: {color},
        });
    }

    store.updateSquare(squareId, {color});
};

const isLabelUnchanged = (squareId, label) => {
    const oldLabel = selectors.getSquareLabel(squareId) || '';
    const newLabel = label || '';

    return oldLabel === newLabel;
};

export const updateSquareLabel = (squareId, label) => {
    store.setSquareNodeWithLabelPicker(null);

    if (!squareId) {
        backend.throwError('Square id is invalid.');
        return;
    }

    if (isLabelUnchanged(squareId, label)) {
        return;
    }

    if (label && !selectors.getSquare(squareId)) {
        backend.create('squares', {squareId, label});
    }

    if (label && selectors.getSquare([squareId])) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {
            $set: {label},
        });
    }

    if (!label && !selectors.isSquareColored(squareId)) {
        backend.remove(`squares/${selectors.getSquareId(squareId)}`);
    }

    if (!label && selectors.isSquareColored(squareId)) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {
            $unset: {label},
        });
    }

    store.updateSquare(squareId, {label});
};

export const setSquares = data => {
    for (const i in data) {
        const squareId = data[i].squareId;
        const squareData = {
            _id: data[i]._id,
            ...getValidData(data[i].color, data[i].label),
        };

        store.updateSquare(squareId, squareData);
    }
};
