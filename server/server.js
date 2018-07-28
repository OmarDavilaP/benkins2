const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes=require('./routes');
const app=express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});
app.use(express.static(path.join(__dirname, 'dist')));
// Set our api routes

// Catch all other routes and return the index file
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/benkings/dist/index.html'));
});*/


routes(app,{});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
