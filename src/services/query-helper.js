import * as config from '../config/config.js';

const getQueryParam = (name) => {
    const queryString = location.href.split('?')[1];

    if (!queryString) {
        return null;
    }
    const queryParams = queryString.split('&');

    if (!queryParams) {
        return null;
    }

    const queryParam = queryParams.find(queryParam => queryParam.indexOf(`${name}=`) >= 0);

    if (!queryParam) {
        return null;
    }

    return queryParam.split('=')[1];
};

export const getTimeout = () => {
    const timeout = getQueryParam('timeout') || config.defaultTimeout;

    return timeout >= config.defaultTimeout ? timeout : config.defaultTimeout;
};

export const getBoardId = (boards) => {
    const boardFromQuery = getQueryParam('board');
    const match = boards && boardFromQuery && boards.find(board => board.name && board.name.toUpperCase() === boardFromQuery.toUpperCase());

    if (match) {
        return match._id
    }

    return boardFromQuery || config.defaultBoardId;
};