import * as selectors from '../state/selectors.js';
import * as colorPicker from './color-picker.js';
import * as labelPicker from './label-picker.js';
import * as htmlSelectors from '../services/html-helper.js';
import * as config from '../config/config.js';
import * as cell from './cell.js';
import * as piece from './piece.js';
import * as sideBar from './side-bar.js';
import * as events from './event-handler.js';

export const renderBattleMap = () => {
    sideBar.renderSideBar();

    colorPicker.renderColorPicker();

    htmlSelectors.createHtmlElement({
        id: 'battle-map',
        className: 'grid-container',
    });

    for (let cellIndex = 0; cellIndex < config.maxCells; cellIndex++) {
        cell.renderCell(cellIndex);
    }

    for (const pieceId in selectors.getPieces()) {
        piece.renderPiece(pieceId);
    }

    events.addDragAndDropEventListeners();
    events.addMouseEventListeners();

    window.scrollBy(0, 0);
};
