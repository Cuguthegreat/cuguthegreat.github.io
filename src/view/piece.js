import * as selectors from '../state/selectors.js';
import * as htmlSelectors from '../services/html-helper.js';
import * as pieces from '../state/pieces.js';
import * as config from '../config/config.js';
import * as colors from '../services/color-helper.js';

export const updatePieceNode = pieceId => {
    const pieceNode = htmlSelectors.getPieceNode(pieceId);

    pieceNode.textContent = selectors.getPieceName(pieceId);
    pieceNode.style.color =
        '#' + colors.getColor(selectors.getPieceColor(pieceId));
    pieceNode.style.backgroundColor = '#' + selectors.getPieceColor(pieceId);
};

export const renderPiece = pieceId => {
    const cellIndex = `${selectors.getPiecePosition(pieceId)}`;
    const pieceNode = document.createElement('div');

    htmlSelectors.getCellNode(cellIndex).appendChild(pieceNode);
    pieceNode.className = `piece piece--${selectors.getPieceName(
        pieceId
    )}`;
    pieceNode.id = pieceId;
    pieceNode.setAttribute('draggable', 'true');
    pieceNode.setAttribute('ondragstart', `drag(event, "${pieceId}")`);

    updatePieceNode(pieceId);
};

export const changePieceId = (oldPieceId, newPieceId) => {
    const pieceNode = htmlSelectors.getPieceNode(oldPieceId);

    pieceNode.id = newPieceId;
    pieceNode.setAttribute('ondragstart', `drag(event, "${newPieceId}")`);
};

export const changePieceColor = (pieceId, color) => {
    if (config.protectedPieces.indexOf(pieceId) >= 0) {
        alert(config.protectionMessage);
    } else {
        pieces.updatePieceColor(pieceId, color);
        updatePieceNode(pieceId);
    }
};

export const changePieceName = (pieceId, label) => {
    if (config.protectedPieces.indexOf(pieceId) >= 0) {
        alert(config.protectionMessage);
    } else {
        pieces.updatePieceName(pieceId, label);
        updatePieceNode(pieceId);
    }
};

export const deletePiece = event => {
    const draggedPieceId = selectors.getDraggedPieceId();

    event.preventDefault();

    if (config.protectedPieces.indexOf(selectors.getDraggedPieceId()) >= 0) {
        alert(config.protectionMessage);
    } else {
        document.getElementById(draggedPieceId) &&
        document.getElementById(draggedPieceId).remove();
        pieces.removePiece(draggedPieceId);
    }
};
