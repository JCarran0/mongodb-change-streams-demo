'use strict';

const modelsPlugin = {
  plugin: require('hapi-mongo-models'),
    options: {
    mongodb: {
      connection: {
        uri: process.env.DB_URI,
        db: process.env.DB_NAME
      },
      options: {
        useNewUrlParser: true
      }
    },
    models: [
      '../../models/Task.js'
    ],
    autoIndex: false
  }
};

module.exports = modelsPlugin;