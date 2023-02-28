const { User } = require('../database/models');
const md5 = require('md5');
const HttpStatusCode = require('../utils/HttpStatusCode');

const login = async ({ email, password }) => {
  const result = await User.findOne({ where: { email } });
  
  if (!result) return { status: HttpStatusCode.NOT_FOUND, message: 'Not found' };

  const codedPassword = md5(password);

  if (codedPassword !== result.password) return { status: HttpStatusCode.UNAUTHORIZED, message: 'Invalid password' };

  return { status: HttpStatusCode.OK, result };
};

module.exports = { login };