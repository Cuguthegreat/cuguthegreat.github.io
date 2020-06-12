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
import * as events from './event-handler.js';

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

    events.addDragAndDropEventListeners();
};

window.drag = dragAndDrop.drag;
window.onColorPickerChange = colorPicker.onColorPickerChange;
window.onLabelChange = labelPicker.onLabelChange;

window.showColorPicker = colorPicker.showColorPicker;
window.showLabelPicker = labelPicker.showLabelPicker;
