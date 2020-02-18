const state = {
    squares: {},
    entities: {},
    draggedEntityId: null,
    squareNodeWithColorPicker: null,
    squareNodeWithLabelPicker: null,
};

export const getState = () => state;

export const createSquare = (squareId, data) => {
    state.squares[squareId] = data;
};

export const updateSquare = (squareId, data) => {
    if (Object.keys(data).length !== 0) {
        state.squares[squareId] = {...state.squares[squareId], ...data};
    } else {
        deleteSquare(squareId);
    }
};

export const deleteSquare = squareId => {
    delete state.squares[squareId];
};

export const updateEntity = (entityId, data) => {
    state.entities[entityId] = {...state.entities[entityId], ...data};
};

export const deleteEntity = entityId => {
    delete state.entities[entityId];
};

export const setDraggedEntityId = entityId => {
    state.draggedEntityId = entityId;
};

export const setSquareNodeWithColorPicker = squareId => {
    //TODO Do it properly
    squareId === null && document.body.appendChild(document.getElementById('jscolor'));

    state.squareNodeWithColorPicker = squareId;
    state.squareNodeWithLabelPicker = null;
};

export const setSquareNodeWithLabelPicker = squareId => {
    //TODO Do it properly
    document.body.appendChild(document.getElementById('jscolor'));

    state.squareNodeWithColorPicker = null;
    state.squareNodeWithLabelPicker = squareId;
};
