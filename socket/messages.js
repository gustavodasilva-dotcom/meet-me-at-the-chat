const socketio = require('socket.io');
const { sendMessage } = require('../utils/messages');
const { joinUser, getCurrentUser, userLeaves, getChatUsers } = require('../utils/users');

const socketMessages = (server) => {
  const botName = 'Meet Me At The Chat! Bot';

  const io = socketio(server);

  io.on('connection', socket => {
    socket.on('joinChat', (options) => {
      const userJoined = joinUser({
        id: socket.id,
        ...options
      });

      socket.join(userJoined.chat);

      socket.emit('message', sendMessage({
        username: botName,
        text: 'Welcome to Meet Me At The Chat!'
      }));

      socket.broadcast
        .to(userJoined.chat)
        .emit('message', sendMessage({
          username: botName,
          text: `${userJoined.user} has joined the chat`
        }));

      io.to(userJoined.chat).emit('chatUsers', {
        chat: userJoined.chat,
        users: getChatUsers(userJoined.chat)
      });
    });

    socket.on('chatMessage', (message) => {
      const currentUser = getCurrentUser(socket.id);

      io.to(currentUser.chat).emit('message', sendMessage({
        username: currentUser.user,
        text: message
      }));
    });

    socket.on('disconnect', () => {
      const userLeaving = userLeaves(socket.id);

      if (userLeaving) {
        io.to(userLeaving.chat).emit('message', sendMessage({
          username: botName,
          text: `${userLeaving.user} has left the chat`
        }));

        io.to(userLeaving.chat).emit('chatUsers', {
          chat: userLeaving.chat,
          users: getChatUsers(userLeaving.chat)
        });
      }
    });
  });
};

module.exports = socketMessages;