export const URL = 'https://pathfinder-battle-map.herokuapp.com';
export const HEADERS = {
    'Content-Type': 'application/json',
};

export const read = subpath =>
  fetch(`${URL}/api/${subpath}`, {
    method: 'GET',
    headers: HEADERS
  })
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });

export const create = (subpath, body) =>
  fetch(`${URL}/api/${subpath}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body)
  })
  .catch((error) => {
    console.error('Error:', error);
  });

export const update = (subpath, body) =>
  fetch(`${URL}/api/${subpath}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(body)
  })
  .catch((error) => {
    console.error('Error:', error);
  });

export const remove = subpath =>
  fetch(`${URL}/api/${subpath}`, {
    method: 'DELETE',
    headers: HEADERS
  })
  .catch((error) => {
    console.error('Error:', error);
  });
