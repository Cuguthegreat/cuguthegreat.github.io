import * as store from './store.js';
import * as backend from '../services/backend-calls.js';

export const setEntities = data => {
    for (const i in data) {
        const key = data[i].position;

        store.updateEntity(key, {_id: data[i]._id, name: data[i].name, text: data[i].text});
    }
}

export const updateEntity = (entityId, data) => {
    backend.update(`entities/${entityId}`, data)
}