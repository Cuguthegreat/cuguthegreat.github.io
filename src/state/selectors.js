import {getState} from './store.js';
import * as config from '../config/config.js';

export const getSquare = squareId => getState().squares[squareId];
// square database id
export const getSquareId = squareId =>
    getState().squares[squareId] && getState().squares[squareId]._id;
export const getSquareColor = squareId =>
    (getState().squares[squareId] && getState().squares[squareId].color) ||
    config.defaultSquareColor;
export const getSquareLabel = squareId =>
    (getState().squares[squareId] && getState().squares[squareId].label) || '';

export const isSquareColored = squareId =>
    !!(getState().squares[squareId] && getState().squares[squareId].color);
export const isSquareLabeled = squareId =>
    !!(getState().squares[squareId] && getState().squares[squareId].label);

export const getEntities = () => getState().entities;
export const getEntityPosition = entityId =>
    getState().entities[entityId] && getState().entities[entityId].position;
export const getEntityName = entityId =>
    getState().entities[entityId] && getState().entities[entityId].name;
export const getEntityText = entityId =>
    getState().entities[entityId] && getState().entities[entityId].text;

export const getDraggedEntityId = () => getState().draggedEntityId;
export const getSquareNodeWithColorPicker = () =>
    getState().squareNodeWithColorPicker;
export const getSquareNodeWithLabelPicker = () =>
    getState().squareNodeWithLabelPicker;
