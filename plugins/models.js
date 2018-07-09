'use strict';

const modelsPlugin = {
  plugin: require('hapi-mongo-models'),
    options: {
    mongodb: {
      connection: {
        uri: 'mongodb://localhost:27017/',
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