export const getBattleMapNode = () => document.getElementById('battle-map');

export const getTombstoneNode = () =>
    document.getElementById('tombstone-drop-zone');

export const getColorPickerNode = () => document.getElementById('jscolor');

export const getLabelPickerNode = () =>
    document.getElementById('cell-label-picker');

export const getCellNode = cellIndex => document.getElementById(`cell-${cellIndex}`);
export const getPieceNode = pieceId => document.getElementById(pieceId);

export const getMultiSelect = () => document.getElementById('multi-select');

export const isCellNode = element => element.className.indexOf('cell') >= 0;

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
