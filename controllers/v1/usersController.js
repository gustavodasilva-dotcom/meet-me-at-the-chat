const bcrypt = require('bcrypt');

const Users = require('../../models/users/Users');
const registerUserSchema = require('../../validators/users/register-user');
const ErrorHandler = require('../../middlewares/ErrorHandler');
const httpSettings = require('../../utils/httpSettings');

const register = async (req, res) => {
  try {
    const request = registerUserSchema.validateSync(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    const hashedPwd = await bcrypt.hash(request.password, 10);
    request.password = hashedPwd;

    const result = await Users.create({ ...request });

    res.status(httpSettings.codes.Created).json({
      data: {
        ...result._doc
      }
    });
  } catch (error) {
    ErrorHandler(error, res);
  }
};

module.exports = {
  register
};