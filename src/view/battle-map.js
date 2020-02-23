import * as selectors from '../state/selectors.js';
import * as entities from '../state/entities.js';
import * as dragAndDrop from './drag-and-drop.js';
import * as colorPicker from './color-picker.js';
import * as labelPicker from './label-picker.js';
import * as htmlSelectors from '../services/html-helper.js';
import {createHtmlElement} from '../services/html-helper.js';
import * as config from '../config/config.js';
import {renderSquare} from './square.js';
import {renderEntity} from './entity.js';
import * as sideBar from './side-bar.js';

export const renderBattleMap = () => {
    sideBar.renderSideBar();

    createHtmlElement({
        id: 'battle-map',
        className: 'grid-container',
    });

    for (let squareId = 0; squareId < config.maxSquares; squareId++) {
        renderSquare(squareId);
    }

    for (const entityId in selectors.getEntities()) {
        renderEntity(entityId);
    }

    htmlSelectors
        .getColorPickerNode()
        .setAttribute('onblur', 'onColorPickerChange(this.jscolor)');
    htmlSelectors
        .getTombstoneNode()
        .setAttribute('ondragover', 'allowDrop(event)');
    htmlSelectors
        .getTombstoneNode()
        .setAttribute('ondrop', 'deleteEntity(event)');
};

const deleteEntity = event => {
    const draggedEntityId = selectors.getDraggedEntityId();

    event.preventDefault();

    if (config.protectedEntities.indexOf(selectors.getDraggedEntityId()) >= 0) {
        alert('Not even in your dreams, bitch!');
    } else {
        document.getElementById(draggedEntityId) &&
            document.getElementById(draggedEntityId).remove();
        entities.removeEntity(draggedEntityId);
    }
};

window.allowDrop = dragAndDrop.allowDrop;
window.deleteEntity = deleteEntity;
window.drag = dragAndDrop.drag;
window.drop = dragAndDrop.drop;
window.onColorPickerChange = colorPicker.onColorPickerChange;
window.showColorPicker = colorPicker.showColorPicker;
window.showLabelPicker = labelPicker.showLabelPicker;
window.onLabelChange = labelPicker.onLabelChange;
