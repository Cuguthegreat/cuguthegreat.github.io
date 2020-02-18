import * as store from './store.js';
import * as backend from '../services/backend-calls.js';
import * as selectors from './selectors.js';

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

const isNameUnchanged = (entityId, name) => selectors.getEntityName(entityId) === name;

export const updateEntityName = (entityId, name) => {
    store.setSquareNodeWithLabelPicker(null);

    if (!entityId) {
        backend.throwError('Entity id is invalid.');
        return;
    }

    if (!name || isNameUnchanged(entityId, name)) {
        return;
    }

    backend.update(`entities/${entityId}`, {
        $set: {name, text: name},
    });

    store.updateEntity(entityId, {name, text: name});
};
