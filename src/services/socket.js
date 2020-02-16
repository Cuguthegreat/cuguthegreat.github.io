import * as backend from './backend-calls.js';

export const start = () => {
  const socket = io.connect(backend.URL);

  socket.on('update', data => {
    const id = data.documentKey._id;
    const update =
      data.updateDescription && data.updateDescription.updatedFields;

    if (update && update.position) {
      document
        .getElementById(`grid-item-${update.position}`)
        .appendChild(document.getElementById(`${id}`));
    }
  });

  socket.on('disconnect', reason => {
    backend.throwError(reason);
  });
};
