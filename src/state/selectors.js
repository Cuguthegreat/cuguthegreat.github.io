import {getState} from './store.js';
import * as config from '../config/config.js';

export const getCells = () => getState().cells;
export const getCell = cellIndex => getState().cells[cellIndex];
export const getCellId = cellIndex =>
    getState().cells[cellIndex] && getState().cells[cellIndex]._id;
export const getCellColor = cellIndex =>
    (getState().cells[cellIndex] && getState().cells[cellIndex].color) ||
    config.defaultCellColor;
export const getCellLabel = cellIndex =>
    (getState().cells[cellIndex] && getState().cells[cellIndex].label) || '';

export const isCellColored = cellIndex =>
    !!(getState().cells[cellIndex] && getState().cells[cellIndex].color);
export const isCellLabeled = cellIndex =>
    !!(getState().cells[cellIndex] && getState().cells[cellIndex].label);

export const getPiece = pieceId => getState().pieces[pieceId];
export const getPieces = () => getState().pieces;
export const getPiecePosition = pieceId =>
    getState().pieces[pieceId] && getState().pieces[pieceId].position;
export const getPieceName = pieceId =>
    getState().pieces[pieceId] && getState().pieces[pieceId].name;
export const getPieceColor = pieceId =>
    (getState().pieces[pieceId] && getState().pieces[pieceId].color) ||
    config.defaultPieceColor;

export const isPieceInState = pieceId => !!getState().pieces[pieceId];

export const getDraggedPieceId = () => getState().draggedPieceId;
export const getCellNodeWithColorPicker = () =>
    getState().cellNodeWithColorPicker;
export const getCellNodeWithLabelPicker = () =>
    getState().cellNodeWithLabelPicker;

export const getMultiSelectCellIndices = () =>
    getState().multiSelectCellIndices;
export const isMultiSelectActive = () =>
    getState().multiSelectCellIndices.length > 0;
