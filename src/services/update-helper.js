import * as backend from './backend-calls.js';
import * as selectors from '../state/selectors.js';
import * as piece from '../view/piece.js';
import * as pieces from '../state/pieces.js';
import * as cells from '../state/cells.js';
import * as cell from '../view/cell.js';
import * as store from '../state/store.js';
import * as features from '../config/features.js';

export const startUpdateHelper = () => {
    backend.getCurrentDate().then(currentDate => fetchUpdates(currentDate));
};

const TIMEOUT = features.getTimeout();

let lastCurrentDate;

export const fetchUpdates = (currentDate) => {
    backend.getCurrentDate().then(newCurrentDate => {
        lastCurrentDate = newCurrentDate;

        return Promise.all([
            backend.read('pieces', `?changedSince=${currentDate}`),
            backend.read('cells', `?changedSince=${currentDate}`),
        ]);
    })
        .then(([piecesData, cellsData]) => {
            cells.setCells(cellsData);

            for (const i in cellsData) {
                const cellIndex = cellsData[i].cellIndex;

                if (cellsData[i].deleted) {
                    store.deleteCell(cellIndex);
                }

                cell.updateCellNode(cellIndex);
            }

            for (const i in piecesData) {
                const pieceDatum = piecesData[i];
                const pieceId = pieceDatum._id;
                const pieceInStore = selectors.getPiece(pieceId);

                if (pieceDatum.deleted) {
                    document.getElementById(pieceId) && document.getElementById(pieceId).remove();

                    return;
                }

                pieces.setPiece(pieceDatum);

                if (pieceInStore) {
                    piece.updatePieceNode(pieceId);

                    const oldPosition = pieceInStore.position;
                    const newPosition = pieceDatum.position;

                    if (newPosition && newPosition !== oldPosition) {
                        document
                            .getElementById(`cell-${newPosition}`)
                            .appendChild(document.getElementById(`${pieceId}`));
                    }
                } else {
                    piece.renderPiece(pieceId);
                }
            }
        });

    setTimeout(() => {
        fetchUpdates(lastCurrentDate);
    }, TIMEOUT);
};
