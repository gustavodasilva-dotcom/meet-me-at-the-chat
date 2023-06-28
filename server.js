const express = require('express');
const path = require('path');
const http = require('http');
const dotnev = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const socketMessages = require('./socket/messages');
const mongoConn = require('./config/mongoConn');
const configRoutes = require('./configRoutes');

const app = express();
const server = http.createServer(app);

dotnev.config();

const PORT = process.env.PORT || 3000;

mongoConn();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'views')));

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

configRoutes(app);

socketMessages(server);

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});