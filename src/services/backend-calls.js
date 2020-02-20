import * as features from './features.js';

export const URL = 'https://pathfinder-battle-map.herokuapp.com';
export const HEADERS = {
    'Content-Type': 'application/json',
};

export const throwError = error => {
    alert(`Error: ${error}. Please reload!`);
    console.error('Error:', error);
};

const addParameters = subpath =>
    features.isTestEnv() ? `${subpath}?experimental=true` : subpath;

export const read = subpath =>
    fetch(`${URL}/api/${addParameters(subpath)}`, {
        method: 'GET',
        headers: HEADERS,
    })
        .then(response =>
            response.ok ? response.json() : throwError(response.statusText)
        )
        .catch(throwError);

export const create = (subpath, body) =>
    fetch(`${URL}/api/${addParameters(subpath)}`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(body),
    })
        .then(response =>
            response.ok ? response.json() : throwError(response.statusText)
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
        method: 'DELETE',
        headers: HEADERS,
    })
        .then(response => response.ok || throwError(response.statusText))
        .catch(throwError);
