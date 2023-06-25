const moment = require('moment');

const sendMessage = function (options) {
  return {
    ...options,
    time: moment().format('h:m a')
  };
};

module.exports = { sendMessage };