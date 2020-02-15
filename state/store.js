const NO_COLOR = 'a9d271';

let Squares = {};

export const getSquares = () => Squares;
export const getSquare = squareId => Squares[squareId];
export const getSquareId = squareId => Squares[squareId] && Squares[squareId]._id;
export const getSquareColor = squareId => Squares[squareId] && Squares[squareId].color || NO_COLOR;
export const getSquareLabel = squareId => Squares[squareId] && Squares[squareId].label || '';

export const createSquare = (squareId, data) => {
    Squares[squareId] = data;
};

export const updateSquare = (squareId, data) => {
    Squares[squareId] = {...Squares[squareId], ...data};
};

export const deleteSquare = (squareId) => {
    delete Squares[squareId];
};

