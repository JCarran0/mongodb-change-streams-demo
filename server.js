"use strict";

require('dotenv').load(); // Loads .env vars into process.env
const Hapi = require("hapi");

// Create a server with a host and port
// process.env.PORT lets the port be set by Heroku, 
// where our demo api is deployed
const server = Hapi.server({
  host: "localhost",
  port: process.env.PORT || 8000,
  routes: {
    cors: true
  }
});

// Start the server
async function start() {
  try {
    await server.register(require('./plugins/routes'));
    await server.register(require('./plugins/models'))
    await server.register(require('./plugins/pusher'))
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
}

start();