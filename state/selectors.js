import { getState, NO_COLOR } from './store.js';

export const getSquares = () => getState().squares;
export const getSquare = squareId => getState().squares[squareId];
export const getSquareId = squareId => getState().squares[squareId] && getState().squares[squareId]._id;
export const getSquareColor = squareId => getState().squares[squareId] && getState().squares[squareId].color || NO_COLOR;
export const getSquareLabel = squareId => getState().squares[squareId] && getState().squares[squareId].label || '';
export const isSquareColored = squareId => !!(getState().squares[squareId] && getState().squares[squareId].color)

export const getEntities = () => getState().entities;
export const getEntity = squareId => getState().entities[squareId];
export const getEntityId = squareId => getState().entities[squareId] && getState().entities[squareId]._id;
export const getEntityName = squareId => getState().entities[squareId] && getState().entities[squareId].name;
export const getEntityText = squareId => getState().entities[squareId] && getState().entities[squareId].text;

export const getDraggedEntityId = () => getState().draggedEntityId;
export const getSquareNodeWithColorPicker = () => getState().squareNodeWithColorPicker;
export const getSquareNodeWithLabelPicker = () => getState().squareNodeWithLabelPicker;