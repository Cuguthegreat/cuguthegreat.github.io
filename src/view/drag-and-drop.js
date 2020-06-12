import * as selectors from '../state/selectors.js';
import * as pieces from '../state/pieces.js';
import * as store from '../state/store.js';
import * as pieceCreator from './piece-creator.js';
import * as piece from './piece.js';
import * as htmlSelectors from '../services/html-helper.js';

const isValidDropTarget = event => {
    if (
        event.target.className === 'tombstone-drop-zone' &&
        !pieceCreator.isNew(selectors.getDraggedPieceId())
    ) {
        return true;
    }

    return (
        event.target.childElementCount === 0 &&
        htmlSelectors.isCellNode(event.target)
    );
};

export const drag = (event, id) => {
    event.dataTransfer.setData('text', event.target.id);
    store.setDraggedPieceId(id);
};

export const allowDrop = event => {
    if (isValidDropTarget(event)) {
        event.preventDefault();
    }
};

export const drop = (event, cellIndex) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');

    if (isValidDropTarget(event)) {
        event.target.appendChild(document.getElementById(data));
        const draggedPieceId = selectors.getDraggedPieceId();

        if (!selectors.isPieceInState(draggedPieceId)) {
            pieces
                .createPiece({
                    uuid: draggedPieceId,
                    name: 'New',
                    position: cellIndex,
                })
                .then(responseBody =>
                    piece.changePieceId(responseBody.uuid, responseBody._id)
                );
            pieceCreator.renderPieceCreator();
        } else if (!pieceCreator.isNew(draggedPieceId)) {
            pieces.updatePiece(draggedPieceId, {
                $set: {position: String(cellIndex)},
            });
        }

        store.updatePiece(draggedPieceId, {position: cellIndex});
    }
};
