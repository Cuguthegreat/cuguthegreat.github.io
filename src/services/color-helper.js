import * as config from '../config/config.js';

const isLight = (red, green, blue) =>
    0.213 * red + 0.715 * green + 0.072 * blue > 255 / 2;

export const getColor = hex => {
    const red = parseInt(hex.substr(0, 2), 16);
    const green = parseInt(hex.substr(2, 2), 16);
    const blue = parseInt(hex.substr(4, 2), 16);

    return isLight(red, green, blue) ? '000' : 'fff';
};

export const getValidEntityColor = color => color || config.defaultEntityColor;

export const getValidSquareColor = color => color || config.defaultSquareColor;
