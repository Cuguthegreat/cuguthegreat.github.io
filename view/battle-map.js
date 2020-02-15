import * as store from '../state/store.js';
import {getTombstone} from '../services/html-selectors.js';
import * as colorPicker from '../services/color-picker.js';

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

    for (const squareId in store.getEntities()) {
        const entityId = `${store.getEntityId(squareId)}`;
        const entityNode = document.createElement('div');
        document.getElementById(`grid-item-${squareId}`).appendChild(entityNode);
        entityNode.className = `player player--${store.getEntityName(squareId)}`;
        entityNode.id = entityId;
        entityNode.textContent = `${store.getEntityText(squareId)}`;
        entityNode.setAttribute('draggable', 'true');
        entityNode.setAttribute('ondragstart', `drag(event, "${entityId}")`);
    }

    getTombstone().setAttribute('ondragover', 'allowDrop(event)');
    getTombstone().setAttribute('ondrop', 'deleteEntity(event)');

    colorPicker.getColorPicker().setAttribute('onchange', 'onColorPickerChange(this.jscolor)');
}