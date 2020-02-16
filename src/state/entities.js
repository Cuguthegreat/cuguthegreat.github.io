import * as store from './store.js';
import * as backend from '../services/backend-calls.js';

export const setEntities = data => {
    for (const i in data) {
        const entityId = data[i]._id;
        const entityData = {
            _id: data[i]._id,
            name: data[i].name,
            text: data[i].text,
            position: data[i].position
        };

        store.updateEntity(entityId, entityData);
    }
};

export const createEntity = data => {
    backend.create('entities', data);
};

export const updateEntity = (entityId, data) => {
    backend.update(`entities/${entityId}`, data);
};

export const removeEntity = entityId => {
    backend.remove(`entities/${entityId}`);
};
