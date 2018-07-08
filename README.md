# A simple MongoDB Change Stream Tutorial
This demo is an adaption of [a tutorial](https://pusher.com/tutorials/mongodb-change-streams) put out by the folks at Pusher.com. 

The idea is to create a simple TODO list application that recieves real-time updates

## Pre-requisites
Install MongoDB 3.6+
Install Node.js 6+

I'm also a fan of nodemon to ease development

```
  npm install nodemon -g
```

## Step 1 - Create a Pusher Channel
Create an account or log into Pusher. Create a Channels app with whatever name you like, choose the cluster closest to your location, and select React as the frontend tech and Node.js as the backend tech.

## Step 2 - Setup the Database
MongoDB Change Streams require the use of either replica sets or sharded cluster. We will be using replica sets.

Open a new terminal window, and create a replica set using a single mongod server

```
  mongod --replSet "rs"
```

Open a second terminal window and connect to mongodb via the mongo shell

```
  mongo
```

If you have never intiated a replica set, do so via the following shell command

```
  rs.initiate()
```

Create a database called changeStreamTasksDb

```
  use changeStreamTasksDb
```

Create a collection called tasks

```
  db.createCollection('tasks')
```

We're now ready to start building.

## Step 3 Setup the Node App

For this tutorial we will build a Node.js API using [Hapi.js](https://hapijs.com/) as our routing framework and [mongo-models](https://github.com/jedireza/mongo-models) for interacting with our database via document models. (This is similar to using express and mongoose). We use the [hapi-mongo-models](https://github.com/jedireza/hapi-mongo-models) plugin to make the connection between our database, mongo-models and hapi.

Create a directory folder

```
  mkdir mongodb-change-streams-demo
  cd mongodb-chage-streams-demo
```

Initialize your NPM project (use -y to auto-accept all defaults)

```
  npm init -y
```

Install project dependencies

* pusher - A library for making use of web-sockets. This is how frontend clients can subscribe to changes in our database
* hapi - a routing framework, like express (but better!)
* hapi-mongo-models - a plugin for using mongo-models with hapi
* mongo-models - a document model utility (like mongoose)
* mongodb - the Node MongoDB driver (a dependency of mongo-models)

```
  npm install --save pusher hapi hapi-mongo-models mongo-models mongodb
```


