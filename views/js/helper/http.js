const AjaxHelper = function () {
  return {
    getPath: (url) => {
      return `${window.location.origin}/${url}`;
    },
    request: async (options) => {
      const { url, body, ...config } = options;
      
      await fetch(
        url,
        {
          ...config,
          body
        })
        .then(async res => {
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
          } else {
            return res.json();
          }
        })
        .catch(err => {
          console.log('caught it!', err);
        });
    }
  };
}();