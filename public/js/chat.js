var ChatPage = function () {
  return {
    init: () => {
      ChatPage.props.primitive.actions.set();
      ChatPage.socket.prepare();
    },
    props: {
      primitive: {
        chat: null,
        user: null,
        actions: {
          set: () => {
            const { chat, user } = Qs.parse(location.search, {
              ignoreQueryPrefix: true
            });

            ChatPage.props.primitive.chat = chat;
            ChatPage.props.primitive.user = user;
          }
        }
      },
      html: {
        form: document.querySelector('.form-send-message'),
        sentMessage: document.querySelector('.txt-message'),
        receivedMessage: document.querySelector('.message'),
        chatMessages: document.querySelector('.chat-messages')
      }
    },
    socket: {
      instance: io(),
      prepare: () => {
        ChatPage.socket.instance.on('message', message => {
          ChatPage.socket.actions.displayMessage(message);
        });

        ChatPage.socket.instance.emit('joinChat', {
          chat: ChatPage.props.primitive.chat,
          user: ChatPage.props.primitive.user
        });

        ChatPage.props.html.form.addEventListener('submit', (e) => {
          e.preventDefault();
          ChatPage.socket.actions.sendMessage();
        });
      },
      actions: {
        sendMessage: () => {
          const messageEl = ChatPage.props.html.sentMessage;

          ChatPage.socket.instance.emit('chatMessage', messageEl.value);
          
          messageEl.value = '';
          messageEl.focus();
        },
        displayMessage: (message) => {
          const chatMessages = ChatPage.props.html.chatMessages;

          const template = ChatPage.props.html.receivedMessage.cloneNode(true);
          
          template.style.display = "block";

          template.querySelector('.message-user').textContent = message.username;
          template.querySelector('.message-time').textContent = message.time;
          template.querySelector('.message-text').textContent = message.text;

          chatMessages.appendChild(template);
          chatMessages.scrollTo(0, chatMessages.scrollHeight);
        }
      }
    }
  };
}();