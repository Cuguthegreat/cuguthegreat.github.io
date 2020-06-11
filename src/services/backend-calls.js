import * as query from './query-helper.js';

export const URL = 'https://pathfinder-battle-map.herokuapp.com';
export const HEADERS = {
    'Content-Type': 'application/json',
};

export const throwError = error => {
    console.error('Error:', error);
    alert(`Error: ${error}. Please reload!`);
    setTimeout(() => location.reload(), 0);
};

const BOARDS = [{
    '_id': '5ed58b0f365f731ce86e6d24',
    'name': 'Test',
    'createDate': '2020-06-01T23:11:11.570Z',
    'changeDate': '2020-06-11T21:08:58.177Z',
}, {'_id': '5ee29cf67f2e560017b2f746', 'name': 'Donforst', 'createDate': '2020-06-11T21:07:02.759Z'}];

const addParameters = subpath => `${subpath}?boardId=${query.getBoardId(BOARDS)}`;

export const read = (subpath, queryString = '') =>
    fetch(`${URL}/api/${addParameters(subpath)}${queryString}`, {
        method: 'GET',
        headers: HEADERS,
    })
        .then(response =>
            response.ok ? response.json() : throwError(response.statusText),
        )
        .catch(throwError);

export const create = (subpath, body) =>
    fetch(`${URL}/api/${addParameters(subpath)}`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({...body, boardId: query.getBoardId(BOARDS)}),
    })
        .then(response =>
            response.ok ? response.json() : throwError(response.statusText),
        )
        .catch(throwError);

export const update = (subpath, body) =>
    fetch(`${URL}/api/${addParameters(subpath)}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(body),
    })
        .then(response => response.ok || throwError(response.statusText))
        .catch(throwError);

export const remove = subpath =>
    fetch(`${URL}/api/${addParameters(subpath)}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify({
            $set: {deleted: true},
        }),
    })
        .then(response => response.ok || throwError(response.statusText))
        .catch(throwError);

export const getCurrentDate = () =>
    fetch(`${URL}/api/currentDate`, {
        method: 'GET',
        headers: HEADERS,
    })
        .then(response =>
            response.ok ? response.json() : throwError(response.statusText),
        )
        .then(data => data.currentDate)
        .catch(throwError);