'use strict';

const Pusher = require('pusher');
const assert = require('assert');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true,
});

const channel = 'tasks';

const pusherPlugin = {
  name: 'pusherPlugin',
  register: async function (server) {
    // Get the DB from the hapi-mongo-models plugin
    const HapiMongoModelsPlugin = server.plugins['hapi-mongo-models'];
    assert(!!HapiMongoModelsPlugin, 'hapi-mongo-models plugin must be registered');

    const db = HapiMongoModelsPlugin['mongo-models'].dbs.default;
    assert(db, 'MongoDb connection not found');

    const taskCollection = db.collection('tasks');
    const changeStream = taskCollection.watch();

    // Whenever a new task is inserted, send a message with an "insert" event
    // that has the inserted task ID and description     
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