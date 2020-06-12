import * as htmlSelectors from '../services/html-helper.js';
import * as selectors from '../state/selectors.js';
import * as store from '../state/store.js';
import * as events from './event-handler.js';

let mousedownTarget = null;
let mousedownX = 0;
let mousedownY = 0;
let mousemoveX = 0;
let mousemoveY = 0;
let allowSelection = false;

const reset = () => {
    mousedownTarget = null;
    mousedownX = 0;
    mousedownY = 0;
    mousemoveX = 0;
    mousemoveY = 0;
    allowSelection = true;
    htmlSelectors.getMultiSelect().style.borderColor = 'transparent';
};

export const clearMultiSelect = () => {
    const cellIndices = selectors.getMultiSelectCellIndices();

    cellIndices.forEach(cellIndex => {
        htmlSelectors.getCellNode(cellIndex).style.background =
            '#' + selectors.getCellColor(cellIndex);
    });

    store.resetMultiSelectCellIndices();
};

export const allowMultiSelect = () => {
    const multiSelect = document.createElement('div');
    document.body.appendChild(multiSelect);
    multiSelect.id = 'multi-select';
    multiSelect.className = 'multi-select';

    reset();
    events.addMultiSelectEventListeners(onMousedown, onMousemove, onMouseup);
};

const getStyle = () => {
    const top =
        Math.min(mousedownY, mousemoveY) + document.documentElement.scrollTop;
    const left =
        Math.min(mousedownX, mousemoveX) + document.documentElement.scrollLeft;
    const height = Math.abs(mousedownY - mousemoveY);
    const width = Math.abs(mousedownX - mousemoveX);

    return {top, left, height, width};
};

const setStyle = ({top, left, height, width}) => {
    htmlSelectors.getMultiSelect().style.top = top + 'px';
    htmlSelectors.getMultiSelect().style.left = left + 'px';
    htmlSelectors.getMultiSelect().style.height = height + 'px';
    htmlSelectors.getMultiSelect().style.width = width + 'px';
};

const onMousedown = event => {
    if (htmlSelectors.isCellNode(event.target)) {
        event.preventDefault();

        mousedownTarget = event.target;

        mousedownY = event.clientY;
        mousedownX = event.clientX;

        mousemoveX = mousedownX;
        mousemoveY = mousedownY;

        setStyle(getStyle());
        htmlSelectors.getMultiSelect().style.borderColor = 'black';
    }
};

const isEnough = event =>
    Math.abs(event.clientY - mousemoveY) +
        Math.abs(event.clientX - mousemoveX) >
    8;

const onMousemove = event => {
    if (mousedownTarget && isEnough(event)) {
        mousemoveX = event.clientX;
        mousemoveY = event.clientY;
        allowSelection = true;
        setStyle(getStyle());
    }
};

const setAffectedCells = (mouseupPosition, mousedownPosition) => {
    let cellIndices = [];

    for (let cellIndex = 0; cellIndex < 10000; cellIndex++) {
        if (isAffected(cellIndex, mouseupPosition, mousedownPosition)) {
            cellIndices.push(cellIndex);
        }
    }

    const oldMultiSelectCellIndices = selectors.getMultiSelectCellIndices();

    if (
        cellIndices.every(
            cellIndex => oldMultiSelectCellIndices.indexOf(cellIndex) >= 0
        )
    ) {
        store.removeMultiSelectCellIndices(cellIndices);
        cellIndices.forEach(cellIndex => {
            htmlSelectors.getCellNode(cellIndex).style.background =
                '#' + selectors.getCellColor(cellIndex);
        });
    } else {
        store.addMultiSelectCellIndices(cellIndices);
        cellIndices.forEach(cellIndex => {
            const backgroundColor = '#' + selectors.getCellColor(cellIndex);
            htmlSelectors.getCellNode(
                cellIndex
            ).style.background = `repeating-linear-gradient(45deg, ghostwhite, ghostwhite 10px, ${backgroundColor} 10px, ${backgroundColor} 20px)`;
        });
    }
};

const isAffected = (cellIndex, mouseupPosition, mousedownPosition) => {
    if (
        Math.round(
            Math.min(mouseupPosition, mousedownPosition) / 100 - cellIndex / 100
        ) <= 0 &&
        Math.round(
            cellIndex / 100 - Math.max(mouseupPosition, mousedownPosition) / 100
        ) <= 0
    ) {
        return (
            Math.min(mouseupPosition % 100, mousedownPosition % 100) <=
                cellIndex % 100 &&
            cellIndex % 100 <=
                Math.max(mouseupPosition % 100, mousedownPosition % 100)
        );
    }

    return false;
};

const onMouseup = event => {
    if (mousedownTarget && allowSelection) {
        const mousedownPosition = Number(mousedownTarget.id.split('-').pop());
        const mouseupPosition = Number(event.target.id.split('-').pop());

        setAffectedCells(mousedownPosition, mouseupPosition);
    }

    setStyle(getStyle());
    reset();
};
