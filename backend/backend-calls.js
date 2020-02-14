export const URL = 'https://pathfinder-battle-map.herokuapp.com';
export const HEADERS = {
    'Content-Type': 'application/json',
};

export const fetchAll = subpath =>
  fetch(`${URL}/api/${subpath}`, {
    method: 'GET',
    headers: HEADERS
  })
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
