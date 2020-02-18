import * as htmlSelector from '../services/html-selectors.js';
import * as square from './square.js';
import * as selectors from '../state/selectors.js';
import * as store from '../state/store.js';
import * as entity from './entity.js';

const renderLabelPicker = id => {
    const squareLabelPicker = document.createElement('input');

    squareLabelPicker.value = selectors.isStateEntity(id)
        ? selectors.getEntityName(id)
        : selectors.getSquareLabel(id);
    squareLabelPicker.id = 'square-label-picker';
    squareLabelPicker.className = 'square-label-picker';
    squareLabelPicker.setAttribute('onblur', `onLabelChange(event, "${id}")`);

    selectors.isStateEntity(id)
        ? htmlSelector.getEntityNode(id).appendChild(squareLabelPicker)
        : htmlSelector.getSquareNode(id).appendChild(squareLabelPicker);

    squareLabelPicker.focus();
    squareLabelPicker.select();
};

export const onLabelChange = (event, id) => {
    const labelPicker = htmlSelector.getLabelPickerNode();

    labelPicker.remove();
    selectors.isStateEntity(id)
        ? entity.changeEntityName(id, labelPicker.value)
        : square.changeSquareLabel(id, labelPicker.value);
};

export const showLabelPicker = (event, id) => {
    event.preventDefault();
    event.stopPropagation();

    if (
        selectors.getSquareNodeWithColorPicker() !== id &&
        selectors.getSquareNodeWithLabelPicker() !== id
    ) {
        store.setSquareNodeWithLabelPicker(id);
        renderLabelPicker(id);
    }
};
