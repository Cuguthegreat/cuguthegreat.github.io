import * as backend from './services/backend-calls.js';
import * as pieces from './state/pieces.js';
import * as cells from './state/cells.js';
import * as battleMap from './view/battle-map.js';
import * as pieceCreator from './view/piece-creator.js';
import * as socket from './services/socket-helper.js';
import * as multiSelect from './view/multi-select.js';
import * as html from './services/html-helper.js';

export const initBattleMap = (piecesData, cellsData) => {
    pieces.setPieces(piecesData);
    cells.setCells(cellsData);
    battleMap.renderBattleMap();
    pieceCreator.renderPieceCreator();
    multiSelect.allowMultiSelect();
};

Promise.all([backend.read('pieces'), backend.read('cells')]).then(
    ([piecesData, cellsData]) => {
        initBattleMap(piecesData, cellsData);
        // socket.start();
    }
);
