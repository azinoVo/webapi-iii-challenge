const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


//custom middleware
  // - `logger()`
  // - `logger` logs to the console the following information about each request: request method, request url, and a timestamp
  // - this middleware runs on every request made to the API

function logger(req, res, next) {
  console.log(`${req.method} method made from ${req.url} at ${new Date().toISOString()}`)
};

module.exports = server;
