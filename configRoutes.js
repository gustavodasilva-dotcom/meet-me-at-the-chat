const configRoutes = (app) => {
  const API_PREFIX = '/api';
  const V1_PREFIX = '/v1';

  app.use(`${API_PREFIX}${V1_PREFIX}/users`, require('./routes/v1/users'));
};

module.exports = configRoutes;