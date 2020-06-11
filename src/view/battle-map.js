import * as selectors from '../state/selectors.js';
import * as pieces from '../state/pieces.js';
import * as dragAndDrop from './drag-and-drop.js';
import * as colorPicker from './color-picker.js';
import * as labelPicker from './label-picker.js';
import * as htmlSelectors from '../services/html-helper.js';
import * as config from '../config/config.js';
import * as cell from './cell.js';
import * as piece from './piece.js';
import * as sideBar from './side-bar.js';

export const renderBattleMap = () => {
    sideBar.renderSideBar();

    const colorPicker = htmlSelectors.createHtmlElement({
        tagName: 'input',
        className:
            'jscolor {shadow:false, borderWidth:0, backgroundColor:"transparent"}',
    });

    import('../../ressources/jscolor.js').then(() => {
        colorPicker.id = 'jscolor';

        htmlSelectors
            .getColorPickerNode()
            .setAttribute('onblur', 'onColorPickerChange(this.jscolor)');
    });

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

    htmlSelectors
        .getTombstoneNode()
        .setAttribute('ondragover', 'allowDrop(event)');
    htmlSelectors
        .getTombstoneNode()
        .setAttribute('ondrop', 'deletePiece(event)');
};

const deletePiece = event => {
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

window.allowDrop = dragAndDrop.allowDrop;
window.deletePiece = deletePiece;
window.drag = dragAndDrop.drag;
window.drop = dragAndDrop.drop;
window.onColorPickerChange = colorPicker.onColorPickerChange;
window.showColorPicker = colorPicker.showColorPicker;
window.showLabelPicker = labelPicker.showLabelPicker;
window.onLabelChange = labelPicker.onLabelChange;
