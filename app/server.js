const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

require('dotenv/config');

const { APP_HOST, APP_PORT } = process.env;
const io = require('socket.io')(http, {
  cors: {
    origin: `http://${APP_HOST}:${APP_PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./src/sockets')(io);

const PORT = APP_PORT || 3000;

app.use(cors());
app.use('/', express.static(`${__dirname}/public`));

http.listen(PORT, () => console.log('App listening on PORT %s', PORT));
