const md5 = require('md5');
const { createToken } = require('../auth/jsonWebToken');
const { User } = require('../database/models');
const HttpStatusCode = require('../utils/HttpStatusCode');

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

const register = async ({ name, email, password }) => {
  const codedPassword = md5(password);
  const findUser = await User.findOne({ where: { email } });
  if (findUser) return { status: HttpStatusCode.CONFLICT };
  const result = await User.create({ name, email, password: codedPassword });
  return { status: HttpStatusCode.CREATED, result };
};

const admRegister = async ({ name, email, password, role }) => {
  const codedPassword = md5(password);
  const findUser = await User.findOne({ where: { email } });
  if (findUser) return { status: HttpStatusCode.CONFLICT };
  const result = await User.create({ name, email, password: codedPassword, role });
  return { status: HttpStatusCode.CREATED, result };
};

module.exports = { login, register, admRegister };
