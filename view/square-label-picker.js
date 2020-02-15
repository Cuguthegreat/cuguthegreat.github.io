const getSquareLabelPicker = () => document.getElementById('square-label-picker');

const showSquareLabelPicker = (event, squareId) => {
    event.preventDefault();

    if (squareNodeWithColorPicker !== squareId && squareNodeWithLabelPicker !== squareId) {
        event.preventDefault();
        squareNodeWithColorPicker = null

        const squareLabelPicker = document.createElement('input');

        getSquareNode(squareId).appendChild(squareLabelPicker);
        squareLabelPicker.value = getSquareNode(squareId).textContent;
        squareLabelPicker.focus();
        squareLabelPicker.select();
        squareLabelPicker.id = 'square-label-picker';
        squareLabelPicker.className = 'square-label-picker';
        squareLabelPicker.setAttribute('onblur', `updateSquareLabel(event, ${squareId})`);

        squareNodeWithLabelPicker = squareId;
    }
}
