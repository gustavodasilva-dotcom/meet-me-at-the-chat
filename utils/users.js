const users = [];

const joinUser = (options) => {
  const user = { ...options };
  users.push(user);

  return user;
};

const getCurrentUser = (id) => {
  return users.find(u => u.id === id);
};

module.exports = {
  joinUser,
  getCurrentUser
};