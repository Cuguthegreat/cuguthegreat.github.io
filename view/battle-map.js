import * as selectors from '../state/selectors.js';
import * as entities from '../state/entities.js';
import * as dragAndDrop from './drag-and-drop.js';
import * as colorPicker from './color-picker.js';
import * as squareLabelPicker from './square-label-picker.js';
import * as htmlSelectors from '../services/html-selectors.js';
import * as config from '../config/config.js';
import { renderSquare } from './square.js';
import { renderEntity } from './entity.js';

export const renderBattleMap = () => {
  const battleMapNode = document.createElement('div');
  document.body.appendChild(battleMapNode);
  battleMapNode.id = 'battle-map';
  battleMapNode.className = 'grid-container';

  for (let squareId = 0; squareId < 600; squareId++) {
    renderSquare(squareId);
  }

  for (const squareId in selectors.getEntities()) {
    renderEntity(squareId);
  }

  htmlSelectors
    .getColorPickerNode()
    .setAttribute('onchange', 'onColorPickerChange(this.jscolor)');
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
window.showSquareLabelPicker = squareLabelPicker.showSquareLabelPicker;
window.updateSquareLabel = squareLabelPicker.updateSquareLabel;
