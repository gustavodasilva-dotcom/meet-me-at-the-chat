const express = require('express');
const path = require('path');
const http = require('http');
const dotnev = require('dotenv');
const socketio = require('socket.io');
const { sendMessage } = require('./utils/messages');
const { joinUser, getCurrentUser } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
dotnev.config();

const PORT = process.env.PORT || 3000;

const botName = 'Meet Me At The Chat! Bot';

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  socket.on('joinChat', ({ chat, user }) => {
    const recentJoin = joinUser({
      id: socket.id,
      user: user,
      chat: chat
    });

    socket.join(recentJoin.chat);

    socket.emit('message', sendMessage({
      username: botName,
      text: 'Welcome to Meet Me At The Chat!'
    }));
    
    socket.broadcast
      .to(recentJoin.chat)
      .emit('message', sendMessage({
        username: botName,
        text: `${recentJoin.user} has joined the chat`
      }));
  });

  socket.on('chatMessage', (message) => {
    io.emit('message', sendMessage({
      username: 'USER',
      text: message
    }));
  });

  socket.on('disconnect', () => {
    io.emit('message', sendMessage({
      username: botName,
      text: 'A user has left the chat'
    }));
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));