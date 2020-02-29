import * as selectors from './selectors.js';
import * as store from './store.js';
import * as backend from '../services/backend-calls.js';
import * as config from '../config/config.js';
import * as html from '../services/html-helper.js';

const getValidData = ({color, label, _id}) => ({
    ...(color && {color}),
    ...(label && {label}),
    ...(_id && {_id}),
});

const removeId = data => {
    const {_id, ...body} = data;

    return body;
};

const isColorUnchanged = (squareId, color) => {
    const oldColor =
        selectors.getSquareColor(squareId) || config.defaultSquareColor;
    const newColor = color || config.defaultSquareColor;

    return oldColor === newColor;
};

const updateAfterPromiseResolve = responseBody => {
    const storeSquare = getValidData({
        ...responseBody,
        ...selectors.getSquare(responseBody.squareId),
    });

    backend.update(`squares/${responseBody._id}`, {
        $set: removeId(storeSquare),
    });

    store.updateSquare(responseBody.squareId, storeSquare);
};

const isValidColor = color => color && color !== config.defaultSquareColor;

export const updateSquareColor = (squareId, color) => {
    store.setSquareNodeWithColorPicker(null);
    html.getColorPickerNode().jscolor.hide();

    if (!squareId && squareId !== 0) {
        backend.throwError('Square id for color update is invalid.');
        return;
    }

    if (isColorUnchanged(squareId, color)) {
        return;
    }

    if (isValidColor(color) && !selectors.getSquare(squareId)) {
        backend
            .create('squares', {squareId, color})
            .then(updateAfterPromiseResolve);
    }

    if (isValidColor(color) && selectors.getSquareId(squareId)) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {
            $set: {color},
        });
    }

    if (!isValidColor(color) && !selectors.isSquareLabeled(squareId)) {
        backend.remove(`squares/${selectors.getSquareId(squareId)}`);
        store.deleteSquare(squareId);

        return;
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

    if (!squareId && squareId !== 0) {
        backend.throwError('Square id is invalid.');
        return;
    }

    if (isLabelUnchanged(squareId, label)) {
        return;
    }

    if (label && !selectors.getSquare(squareId)) {
        backend
            .create('squares', {squareId, label})
            .then(updateAfterPromiseResolve);
    }

    if (label && selectors.getSquareId(squareId)) {
        backend.update(`squares/${selectors.getSquareId(squareId)}`, {
            $set: {label},
        });
    }

    if (!label && !selectors.isSquareColored(squareId)) {
        backend.remove(`squares/${selectors.getSquareId(squareId)}`);
        store.deleteSquare(squareId);

        return;
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
        const squareData = getValidData(data[i]);

        store.updateSquare(squareId, squareData);
    }
};
