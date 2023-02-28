const md5 = require('md5');
const { User } = require('../database/models');
const HttpStatusCode = require('../utils/HttpStatusCode');

const login = async ({ email, password }) => {
  const result = await User.findOne({ where: { email } });
  
  if (!result) return { status: HttpStatusCode.NOT_FOUND, message: 'Not found' };

  const codedPassword = md5(password);

  if (codedPassword !== result.password) {
    return { status: HttpStatusCode.UNAUTHORIZED, message: 'Invalid password' };
  }

  return { status: HttpStatusCode.OK, result };
};

const register = async ({ name, email, password }) => {
  const codedPassword = md5(password);
  const findUser = await User.findOne({ where: { email } });
  if (findUser) return { status: HttpStatusCode.CONFLICT };
  const result = await User.create({ name, email, password: codedPassword });
  return { status: HttpStatusCode.CREATED, result };
};

module.exports = { login, register };
