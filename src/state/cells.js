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

const isColorUnchanged = (cellIndex, color) => {
    const oldColor =
        selectors.getCellColor(cellIndex) || config.defaultCellColor;
    const newColor = color || config.defaultCellColor;

    return oldColor === newColor;
};

const updateAfterPromiseResolve = responseBody => {
    const storeCell = getValidData({
        ...responseBody,
        ...selectors.getCell(responseBody.cellIndex),
    });

    backend.update(`cells/${responseBody._id}`, {
        $set: removeId(storeCell),
    });

    store.updateCell(responseBody.cellIndex, storeCell);
};

const isValidColor = color => color && color !== config.defaultCellColor;

export const updateCellColor = (cellIndex, color) => {
    store.setCellNodeWithColorPicker(null);
    html.getColorPickerNode().jscolor.hide();

    if (!cellIndex && cellIndex !== 0) {
        backend.throwError('Cell index for color update is invalid.');
        return;
    }

    if (isColorUnchanged(cellIndex, color)) {
        return;
    }

    if (isValidColor(color) && !selectors.getCell(cellIndex)) {
        backend
            .create('cells', {cellIndex, color})
            .then(updateAfterPromiseResolve);
    }

    if (isValidColor(color) && selectors.getCellId(cellIndex)) {
        backend.update(`cells/${selectors.getCellId(cellIndex)}`, {
            $set: {color},
        });
    }

    if (!isValidColor(color) && !selectors.isCellLabeled(cellIndex)) {
        backend.remove(`cells/${selectors.getCellId(cellIndex)}`);
        store.deleteCell(cellIndex);

        return;
    }

    if (!isValidColor(color) && selectors.isCellLabeled(cellIndex)) {
        backend.update(`cells/${selectors.getCellId(cellIndex)}`, {
            $unset: {color},
        });
    }

    store.updateCell(cellIndex, {color});
};

const isLabelUnchanged = (cellIndex, label) => {
    const oldLabel = selectors.getCellLabel(cellIndex) || '';
    const newLabel = label || '';

    return oldLabel === newLabel;
};

export const updateCellLabel = (cellIndex, label) => {
    store.setCellNodeWithLabelPicker(null);

    if (!cellIndex && cellIndex !== 0) {
        backend.throwError('Cell index for label update is invalid.');
        return;
    }

    if (isLabelUnchanged(cellIndex, label)) {
        return;
    }

    if (label && !selectors.getCell(cellIndex)) {
        backend
            .create('cells', {cellIndex, label})
            .then(updateAfterPromiseResolve);
    }

    if (label && selectors.getCellId(cellIndex)) {
        backend.update(`cells/${selectors.getCellId(cellIndex)}`, {
            $set: {label},
        });
    }

    if (!label && !selectors.isCellColored(cellIndex)) {
        backend.remove(`cells/${selectors.getCellId(cellIndex)}`);
        store.deleteCell(cellIndex);

        return;
    }

    if (!label && selectors.isCellColored(cellIndex)) {
        backend.update(`cells/${selectors.getCellId(cellIndex)}`, {
            $unset: {label},
        });
    }

    store.updateCell(cellIndex, {label});
};

export const setCells = data => {
    for (const i in data) {
        const cellIndex = data[i].cellIndex;
        const cellData = getValidData(data[i]);

        store.updateCell(cellIndex, cellData);
    }
};
