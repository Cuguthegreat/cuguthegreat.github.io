const NO_COLOR = 'a9d271';

let Squares = {};
let Entities = {};
let draggedEntityId = null;
let squareNodeWithColorPicker = null;
let squareNodeWithLabelPicker = null;

export const getSquares = () => Squares;
export const getSquare = squareId => Squares[squareId];
export const getSquareId = squareId => Squares[squareId] && Squares[squareId]._id;
export const getSquareColor = squareId => Squares[squareId] && Squares[squareId].color || NO_COLOR;
export const getSquareLabel = squareId => Squares[squareId] && Squares[squareId].label || '';

export const getEntities = () => Entities;
export const getEntityId = squareId => Entities[squareId] && Entities[squareId]._id;
export const getEntityName = squareId => Entities[squareId] && Entities[squareId].name;
export const getEntityText = squareId => Entities[squareId] && Entities[squareId].text;

export const getDraggedEntityId = () => draggedEntityId;
export const getSquareNodeWithColorPicker = () => squareNodeWithColorPicker;
export const getSquareNodeWithLabelPicker = () => squareNodeWithLabelPicker;

export const createSquare = (squareId, data) => {
    Squares[squareId] = data;
};

export const updateSquare = (squareId, data) => {
    Squares[squareId] = {...Squares[squareId], ...data};
};

export const deleteSquare = (squareId) => {
    delete Squares[squareId];
};

export const updateEntity = (key, data) => {
    Entities[key] = {...Entities[key], ...data};
};

export const setDraggedEntityId = entityId => {
    draggedEntityId = entityId;
}

export const setSquareNodeWithColorPicker = squareId => {
    squareNodeWithColorPicker = squareId;
    squareNodeWithLabelPicker = null;
}

export const setSquareNodeWithLabelPicker = entityId => {
    squareNodeWithColorPicker = null;
    squareNodeWithLabelPicker = squareId;
}
