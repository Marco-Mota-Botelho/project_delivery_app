const md5 = require('md5');
const { createToken } = require('../auth/jsonWebToken');
const HttpStatusCode = require('../utils/HttpStatusCode');
const { User } = require('../database/models');

const login = async ({ email, password }) => {
  const data = await User.findOne({ where: { email } });
  
  if (!data) return { status: HttpStatusCode.NOT_FOUND, message: 'Not found' };

  const codedPassword = md5(password);

  const result = data.dataValues;

  const token = createToken({ name: result.name, email: result.email, role: result.role });

  if (codedPassword !== data.password) {
    return { status: HttpStatusCode.UNAUTHORIZED, message: 'Invalid password' };
  }

  return { status: HttpStatusCode.OK, result, token };
};

module.exports = { login };