'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');

const schema = Joi.object({
  _id: Joi.object(),
  description: Joi.string()
});

class Task extends MongoModels {
  static create(description) {

    const document = new Task({
      description
    });

    return this.insertOne(document);
  }

  static remove(taskId) {

    return this.remove({
      _id: taskId
    });
  }
}

Task.collectionName = 'tasks'; // the mongodb collection name
Task.schema = schema;

module.exports = Task;