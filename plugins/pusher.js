'use strict';

const assert = require('assert');

const channel = 'tasks';

const pusherPlugin = {
  name: 'pusherPlugin',
  register: async function (server) {
    const HapiMongoModelsPlugin = server.plugins['hapi-mongo-models'];
    assert(!!HapiMongoModelsPlugin, 'hapi-mongo-models plugin must be registered');

    const db = HapiMongoModelsPlugin['mongo-models'].dbs.default;
    assert(db, 'MongoDb connection not found');

    const taskCollection = db.collection('tasks');
    const changeStream = taskCollection.watch();

    changeStream.on('change', (change) => {
      console.log(change);

      if (change.operationType === 'insert') {
        const task = change.fullDocument;
        pusher.trigger(
          channel,
          'inserted', {
            id: task._id,
            task: task.task,
          }
        );
      }

      if (change.operationType === 'delete') {
        pusher.trigger(
          channel,
          'deleted',
          change.documentKey._id
        );
      }
    });

    server.log('Listening for database changes...');
  }
};

module.exports = pusherPlugin;