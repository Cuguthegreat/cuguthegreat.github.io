import * as features from './feature-flags.js';

export const URL = 'https://pathfinder-battle-map.herokuapp.com';
export const HEADERS = {
    'Content-Type': 'application/json',
};

export const throwError = error => {
    console.error('Error:', error);
    if (features.istTrinkspiel()) {
        alert('TRINK!');
    } else {
        alert(`Error: ${error}. Please reload!`);
    }
    setTimeout(() =>  location.reload(), 0);
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
