const express = require('express');
const path = require('path');
const http = require('http');
const dotnev = require('dotenv');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
dotnev.config();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('New websocket connection');

  socket.emit('message', 'Welcome to Meet Me At The Chat!');

  socket.broadcast.emit('message', 'A user has joined the chat');

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });

  socket.on('chatMessage', (message) => {
    io.emit('message', message);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));