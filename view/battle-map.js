import * as selectors from '../state/selectors.js';
import * as entities from '../state/entities.js';
import * as dragAndDrop from './drag-and-drop.js';
import * as colorPicker from './color-picker.js';
import * as squareLabelPicker from './square-label-picker.js';
import * as htmlSelectors from '../services/html-selectors.js';
import * as config from '../config/config.js';

export const render = () => {
    var battleMapNode = document.createElement('div');
    document.body.appendChild(battleMapNode);
    battleMapNode.id = 'battle-map';
    battleMapNode.className = 'grid-container';

    for (let i = 0; i < 600; i++) {
        var squareNode = document.createElement('div');
        battleMapNode.appendChild(squareNode);
        squareNode.className = 'grid-item';

        squareNode.id = `grid-item-${i}`;
        squareNode.setAttribute('ondragover', 'allowDrop(event)');
        squareNode.setAttribute('ondrop', `drop(event, ${i})`);
        squareNode.setAttribute('oncontextmenu', `showColorPicker(event, ${i})`);
        squareNode.setAttribute('ondblclick', `showSquareLabelPicker(event, ${i})`);
    }

    for (const squareId in selectors.getEntities()) {
        const entityId = `${selectors.getEntityId(squareId)}`;
        const entityNode = document.createElement('div');
        document.getElementById(`grid-item-${squareId}`).appendChild(entityNode);
        entityNode.className = `player player--${selectors.getEntityName(squareId)}`;
        entityNode.id = entityId;
        entityNode.textContent = `${selectors.getEntityText(squareId)}`;
        entityNode.setAttribute('draggable', 'true');
        entityNode.setAttribute('ondragstart', `drag(event, "${entityId}")`);
    }

    htmlSelectors.getColorPicker().setAttribute('onchange', 'onColorPickerChange(this.jscolor)');
    htmlSelectors.getTombstone().setAttribute('ondragover', 'allowDrop(event)');
    htmlSelectors.getTombstone().setAttribute('ondrop', 'deleteEntity(event)');
}

const deleteEntity = event => {
    const draggedEntityId = selectors.getDraggedEntityId();

    event.preventDefault();

    if (config.protectedEntities.indexOf(selectors.getDraggedEntityId()) >= 0 ) {
        alert('Not even in your dreams, bitch!')
    } else {
        document.getElementById(draggedEntityId) && document.getElementById(draggedEntityId).remove();
        entities.removeEntity(draggedEntityId)
    }
}

window.allowDrop = dragAndDrop.allowDrop;
window.deleteEntity = deleteEntity;
window.drag = dragAndDrop.drag;
window.drop = dragAndDrop.drop;
window.onColorPickerChange = colorPicker.onColorPickerChange;
window.showColorPicker = colorPicker.showColorPicker;
window.showSquareLabelPicker = squareLabelPicker.showSquareLabelPicker;
window.updateSquareLabel = squareLabelPicker.updateSquareLabel;
