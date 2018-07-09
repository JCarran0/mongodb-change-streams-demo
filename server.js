"use strict";

require('dotenv').load(); // Loads .env vars into process.env
const Hapi = require("hapi");

// Create a server with a host and port
const server = Hapi.server({
  host: "localhost",
  port: 8000
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