'use strict';

const Task = require('../models/Task');

const routesPlugin = {
  name: 'routesPlugin',
  register: async function (server) {

    server.route({
      method: 'POST',
      path: '/new',
      handler: async function (request, h) {
        const {
          description
        } = request.payload;

        try {
          await Task.create(description);
          return 'success';
        } catch (err) {
          console.error(err);
          throw err; // Errors will be returned via hapi as 500's
        }
      }
    });

    server.route({
      method: 'DELETE',
      path: '/{taskId}',
      handler: async function (request, h) {
        const {
          taskId
        } = request.params;

        try {
          await Task.remove(taskId);
          return 'success';
        } catch (err) {
          console.error(err);
          throw err; // Errors will be returned via hapi as 500's
        }
      }
    });
  }
};

module.exports = routesPlugin;