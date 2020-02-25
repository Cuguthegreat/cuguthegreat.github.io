export const getBattleMapNode = () => document.getElementById('battle-map');

export const getTombstoneNode = () =>
    document.getElementById('tombstone-drop-zone');

export const getSquareNode = squareId =>
    document.getElementById(`grid-item-${squareId}`);

export const getColorPickerNode = () => document.getElementById('jscolor');

export const getLabelPickerNode = () =>
    document.getElementById('square-label-picker');

export const getEntityNode = entityId => document.getElementById(entityId);

export const getMultiSelect = () => document.getElementById('multi-select');

export const isSquareNode = element => element.className === 'grid-item';

export const createHtmlElement = ({
    tagName = 'div',
    parent = document.body,
    id,
    className,
    attributes = {},
    styles = {},
}) => {
    const newNode = document.createElement(tagName);
    parent.appendChild(newNode);
    if (id) {
        newNode.id = id
    }

    if (className || id) {
        newNode.className = className || id;
    }

    for (const style in styles) {
        newNode.style[style] = styles[style];
    }

    for (const attribute in attributes) {
        newNode.setAttribute(attribute, attributes[attribute]);
    }

    return newNode;
};
