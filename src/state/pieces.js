import * as store from './store.js';
import * as backend from '../services/backend-calls.js';
import * as selectors from './selectors.js';
import * as config from '../config/config.js';
import * as html from '../services/html-helper.js';

const getRelevantData = ({name, position, color}) => ({
    ...(name && {name}),
    ...(position && {position}),
    ...(color && {color}),
});

export const setPieces = data => {
    for (const i in data) {
        const pieceId = data[i]._id;
        const pieceData = getRelevantData(data[i]);

        store.updatePiece(pieceId, pieceData);
    }
};

export const createPiece = data =>
    backend.create('pieces', data).then(responseBody => {
        const storePiece = getRelevantData(
            getRelevantData({
                ...responseBody,
                ...selectors.getPiece(responseBody.uuid),
            })
        );

        backend.update(`pieces/${responseBody._id}`, {
            $set: storePiece,
        });
        store.deletePiece(responseBody.uuid);
        store.updatePiece(responseBody._id, storePiece);

        return responseBody;
    });

export const updatePiece = (pieceId, data) => {
    backend.update(`pieces/${pieceId}`, data);
};

export const removePiece = pieceId => {
    backend.remove(`pieces/${pieceId}`);
};

const isColorUnchanged = (pieceId, color) => {
    const oldColor =
        selectors.getPieceColor(pieceId) || config.defaultPieceColor;
    const newColor = color || config.defaultPieceColor;

    return oldColor === newColor;
};

export const updatePieceColor = (pieceId, color) => {
    store.setCellNodeWithColorPicker(null);
    html.getColorPickerNode().jscolor.hide();

    if (!pieceId) {
        backend.throwError('Piece id for color update is invalid.');
        return;
    }

    if (!color || isColorUnchanged(pieceId, color)) {
        return;
    }

    backend.update(`pieces/${pieceId}`, {
        $set: {color},
    });

    store.updatePiece(pieceId, {color});
};

const isNameUnchanged = (pieceId, name) =>
    selectors.getPieceName(pieceId) === name;

export const updatePieceName = (pieceId, name) => {
    store.setCellNodeWithLabelPicker(null);

    if (!pieceId) {
        backend.throwError('Piece id for name update is invalid.');
        return;
    }

    if (!name || isNameUnchanged(pieceId, name)) {
        return;
    }

    backend.update(`pieces/${pieceId}`, {
        $set: {name},
    });

    store.updatePiece(pieceId, {name});
};
