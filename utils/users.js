var users = [];

const joinUser = (options) => {
  const user = { ...options };
  users.push(user);

  return user;
};

const getCurrentUser = (id) => {
  return users.find(u => u.id === id);
};

const userLeaves = (id) => {
  const index = users.findIndex(u => u.id === id);

  if (index > -1) {
    return users.splice(index, 1)[0];
  }
};

const getChatUsers = (chat) => {
  return users.filter(u => u.chat === chat);
}

module.exports = {
  joinUser,
  getCurrentUser,
  userLeaves,
  getChatUsers
};