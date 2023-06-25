var ChatPage = function () {
  return {
    init: () => {
      ChatPage.socket.prepare();
    },
    elements: {
      form: document.querySelector('.form-send-message'),
      message: document.querySelector('.txt-message')
    },
    socket: {
      instance: io(),
      prepare: () => {
        ChatPage.socket.instance.on('message', message => {
          console.log(message);
        });

        ChatPage.elements.form.addEventListener('submit', (e) => {
          e.preventDefault();
          ChatPage.socket.actions.sendMessage();
        });
      },
      actions: {
        sendMessage: () => {
          const message = ChatPage.elements.message.value;
          ChatPage.socket.instance.emit('chatMessage', message);
        }
      }
    }
  };
}();