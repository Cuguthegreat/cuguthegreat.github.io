import * as htmlSelectors from '../services/html-selectors.js';
import * as selectors from '../state/selectors.js';
import * as store from '../state/store.js';
import * as square from './square.js';
import * as entity from './entity.js';
import * as colors from "../services/colors.js";

const isEntity = () => selectors.isStateEntity(selectors.getSquareNodeWithColorPicker());

export const onColorPickerChange = color => {
    isEntity()
        ? entity.changeEntityColor(
        selectors.getSquareNodeWithColorPicker(),
        colors.getValidEntityColor(color).toString()
        )
        : square.changeSquareColor(
        selectors.getSquareNodeWithColorPicker(),
        colors.getValidSquareColor(color).toString()
        );
};

const renderColorPicker = id => {
    const colorPicker = htmlSelectors.getColorPickerNode();
    const parentNode = selectors.isStateEntity(id)
        ? htmlSelectors.getEntityNode(id)
        : htmlSelectors.getSquareNode(id);
    const initialColor = selectors.isStateEntity(id)
        ? selectors.getEntityColor(id)
        : selectors.getSquareColor(id);

    parentNode.appendChild(colorPicker);

    colorPicker.jscolor.fromString(initialColor);
    colorPicker.jscolor.hide();

    colorPicker.jscolor.show();
    colorPicker.focus();
    colorPicker.select();
    colorPicker.jscolor.show();
};

export const showColorPicker = (event, id) => {
    event.stopPropagation();

    if (
        selectors.getSquareNodeWithColorPicker() !== id &&
        selectors.getSquareNodeWithLabelPicker() !== id
    ) {
        event.preventDefault();

        store.setSquareNodeWithColorPicker(id);
        renderColorPicker(id);
    } else {
        // show browser context-menu
    }
};
