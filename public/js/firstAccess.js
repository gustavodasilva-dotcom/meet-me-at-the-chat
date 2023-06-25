var FirstAccessPage = function () {
  return {
    init: () => {
      const { chat } = Qs.parse(location.search, {
        ignoreQueryPrefix: true
      });

      FirstAccessPage.props.primitives.chatName = chat;

      FirstAccessPage.prepare();
    },
    props: {
      primitives: {
        chatName: null,
      },
      html: {
        username: document.querySelector('.edt-username'),
        form: document.querySelector('.form-first-access')
      }
    },
    prepare: () => {
      FirstAccessPage.props.html.form.addEventListener('submit', (e) => {
        e.preventDefault();

        const origin = window.location.origin;

        const room = FirstAccessPage.props.primitives.chatName;
        const user = FirstAccessPage.props.html.username.value.replaceAll(/ /g, "+");

        const chatPage = origin + `/chat.html?chat=${room}&user=${user}`;

        window.location.href = chatPage;
      });
    }
  }
}();