import * as store from './store.js';
import * as backend from '../services/backend-calls.js';
import * as selectors from "./selectors.js";

const getRelevantData = ({name, text, position}) => ({
    ...(name && {name}),
    ...(text && {text}),
    ...(position && {position}),
});

export const setEntities = data => {
    for (const i in data) {
        const entityId = data[i]._id;
        const entityData = getRelevantData(data[i]);

        store.updateEntity(entityId, entityData);
    }
};

export const createEntity = data =>
    backend.create('entities', data).then(responseBody => {
        backend.update(`entities/${responseBody._id}`, {
            $set: getRelevantData(selectors.getEntity(responseBody.uuid)),
        });
        store.deleteEntity(responseBody.uuid);
        store.updateEntity(responseBody._id, getRelevantData(responseBody));

        return responseBody;
    });

export const updateEntity = (entityId, data) => {
    backend.update(`entities/${entityId}`, data);
};

export const removeEntity = entityId => {
    backend.remove(`entities/${entityId}`);
};
