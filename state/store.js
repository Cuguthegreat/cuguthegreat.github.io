export const NO_COLOR = 'a9d271';

const state = {
    squares: {},
    entities: {},
    draggedEntityId: null,
    squareNodeWithColorPicker: null,
    squareNodeWithLabelPicker: null,
}

export const getState = () => state;

export const createSquare = (squareId, data) => {
    state.squares[squareId] = data;
};

export const updateSquare = (squareId, data) => {
    state.squares[squareId] = {...state.squares[squareId], ...data};
};

export const deleteSquare = (squareId) => {
    delete state.squares[squareId];
};

export const updateEntity = (key, data) => {
    state.entities[key] = {...state.entities[key], ...data};
};

export const setDraggedEntityId = entityId => {
    state.draggedEntityId = entityId;
}

export const setSquareNodeWithColorPicker = squareId => {
    state.squareNodeWithColorPicker = squareId;
    state.squareNodeWithLabelPicker = null;
}

export const setSquareNodeWithLabelPicker = squareId => {
    state.squareNodeWithColorPicker = null;
    state.squareNodeWithLabelPicker = squareId;
}
