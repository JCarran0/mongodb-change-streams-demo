'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');

const schema = Joi.object({
  _id: Joi.object(),
  task: Joi.string()
});

class Task extends MongoModels {
  static create(task) {

    const document = new Task({
      task
    });

    return this.insertOne(document);
  }

  static remove(taskId) {

    return this.deleteOne({
      _id: MongoModels.ObjectId(taskId)
    });
  }
}

Task.collectionName = 'tasks'; // the mongodb collection name
Task.schema = schema;

module.exports = Task;