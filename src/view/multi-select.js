import * as htmlSelectors from '../services/html-selectors.js';

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
    allowSelection = false;
    htmlSelectors.getMultiSelect().style.borderColor = 'transparent';
};

export const activateMultiSelect = () => {
    const multiSelect = document.createElement('div');
    document.body.appendChild(multiSelect);
    multiSelect.id = 'multi-select';
    multiSelect.className = 'multi-select';

    document.body.addEventListener('mousedown', event => onMousedown(event));
    document.body.addEventListener('mousemove', event => onMousemove(event));
    document.body.addEventListener('mouseup', event => onMouseup(event), true);

    reset();
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
    if (htmlSelectors.isSquareNode(event.target)) {
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

const setAffectedSquares = (mouseupPosition, mousedownPosition) => {
    let squares = [];

    for (let i=0; i<10000; i++) {
        if (isAffected(i, mouseupPosition, mousedownPosition)) {
            squares.push(i);

            htmlSelectors.getSquareNode(i).style.backgroundColor = 'pink';
        }
    }

    return squares;
};

const isAffected = (squareId, mouseupPosition, mousedownPosition) => {
    if (
        Math.round(Math.min(mouseupPosition, mousedownPosition) / 100 - squareId / 100) <= 0 &&
        Math.round(squareId / 100 - Math.max(mouseupPosition, mousedownPosition) / 100) <= 0
    ) {
        return (
            Math.min(mouseupPosition % 100, mousedownPosition % 100) <=
                squareId % 100 &&
            squareId % 100 <=
                Math.max(mouseupPosition % 100, mousedownPosition % 100)
        );
    }

    return false;
};

const onMouseup = event => {
    if (mousedownTarget && allowSelection) {
        const mousedownPosition = Number(mousedownTarget.id.split('-').pop());
        const mouseupPosition = Number(event.target.id.split('-').pop());

        setAffectedSquares(mousedownPosition, mouseupPosition);
    }

    setStyle(getStyle());
    reset();
};
