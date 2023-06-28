var RegisterPage = function () {
  return {
    init: () => {
      RegisterPage.prepare();
    },
    props: {
      html: {
        form: document.querySelector('.register-form'),
        name: document.querySelector('.edt-name'),
        email: document.querySelector('.edt-email'),
        password: document.querySelector('.edt-password')
      }
    },
    prepare: () => {
      RegisterPage.props.html.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
          name: RegisterPage.props.html.name.value,
          email: RegisterPage.props.html.email.value,
          password: RegisterPage.props.html.password.value
        };

        const params = {
          url: AjaxHelper.getPath('api/v1/users/register'),
          headers: {
            "Content-Type": "application/json"
          },
          method: 'POST',
          body: JSON.stringify(data)
        };

        const request = await AjaxHelper.request({ ...params });
        
      });
    }
  };
}();