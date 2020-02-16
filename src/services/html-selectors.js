export const getBattleMapNode = () => document.getElementById('battle-map');

export const getTombstoneNode = () =>
    document.getElementById('tombstone-drop-zone');

export const getSquareNode = squareId =>
    document.getElementById(`grid-item-${squareId}`);

export const getColorPickerNode = () => document.getElementById('jscolor');

export const getLabelPickerNode = () =>
    document.getElementById('square-label-picker');
