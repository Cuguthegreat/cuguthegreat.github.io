const state = {
    cells: {},
    pieces: {},
    draggedPieceId: null,
    cellNodeWithColorPicker: null,
    cellNodeWithLabelPicker: null,
    multiSelectCellIndices: [],
};

export const getState = () => state;

export const createCell = (cellIndex, data) => {
    state.cells[cellIndex] = data;
};

export const updateCell = (cellIndex, data) => {
    if (Object.keys(data).length !== 0) {
        state.cells[cellIndex] = {...state.cells[cellIndex], ...data};
    } else {
        deleteCell(cellIndex);
    }
};

export const deleteCell = cellIndex => {
    delete state.cells[cellIndex];
};

export const updatePiece = (pieceId, data) => {
    state.pieces[pieceId] = {...state.pieces[pieceId], ...data};
};

export const deletePiece = pieceId => {
    delete state.pieces[pieceId];
};

export const setDraggedPieceId = pieceId => {
    state.draggedPieceId = pieceId;
};

export const setCellNodeWithColorPicker = cellIndex => {
    //TODO Do it properly
    cellIndex === null &&
    document.body.appendChild(document.getElementById('jscolor'));

    state.cellNodeWithColorPicker = cellIndex;
    state.cellNodeWithLabelPicker = null;
};

export const setCellNodeWithLabelPicker = cellIndex => {
    //TODO Do it properly
    document.body.appendChild(document.getElementById('jscolor'));

    state.cellNodeWithColorPicker = null;
    state.cellNodeWithLabelPicker = cellIndex;
};

export const resetMultiSelectCellIndices = () => {
    state.multiSelectCellIndices = [];
};

export const removeMultiSelectCellIndices = cellIndices => {
    let newMultiSelectCellIds = [];

    for (const cellIndex of state.multiSelectCellIndices) {
        if (cellIndices.indexOf(cellIndex) < 0) {
            newMultiSelectCellIds.push(cellIndex);
        }
    }

    state.multiSelectCellIndices = newMultiSelectCellIds;
};

export const addMultiSelectCellIndices = cellIndices => {
    state.multiSelectCellIndices = [...state.multiSelectCellIndices, ...cellIndices];
};
