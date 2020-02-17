export const URL = 'https://pathfinder-battle-map.herokuapp.com';
export const HEADERS = {
    'Content-Type': 'application/json',
};

export const throwError = error => {
    alert(`Error: ${error}. Please reload!`);
    console.error('Error:', error);
};

export const read = subpath =>
    fetch(`${URL}/api/${subpath}`, {
        method: 'GET',
        headers: HEADERS,
    })
        .then(response =>
            response.ok ? response.json() : throwError(response.statusText)
        )
        .catch(throwError);

export const create = (subpath, body) =>
    fetch(`${URL}/api/${subpath}`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(body),
    })
        .then(response =>
            response.ok ? response.json() : throwError(response.statusText)
        )
        .catch(throwError);

export const update = (subpath, body) =>
    fetch(`${URL}/api/${subpath}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(body),
    })
        .then(response => response.ok || throwError(response.statusText))
        .catch(throwError);

export const remove = subpath =>
    fetch(`${URL}/api/${subpath}`, {
        method: 'DELETE',
        headers: HEADERS,
    })
        .then(response => response.ok || throwError(response.statusText))
        .catch(throwError);
