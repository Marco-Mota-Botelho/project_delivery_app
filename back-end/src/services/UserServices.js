const md5 = require('md5');
const { User } = require('../database/models');
const HttpStatusCode = require('../utils/HttpStatusCode');

const register = async ({ name, email, password }) => {
  const codedPassword = md5(password);
  const findUser = await User.findOne({ where: { email } });
  if (findUser) return { message: 'User already registered' ,status: HttpStatusCode.CONFLICT };
  const user = await User.create({ name, email, password: codedPassword });
  const { password: _, ...userWithoutPassword } = user.dataValues;
  return { status: HttpStatusCode.CREATED, result: userWithoutPassword };
};

const admRegister = async ({ name, email, password, role }) => {
  const codedPassword = md5(password);
  const findUser = await User.findOne({ where: { email } });
  if (findUser) return { message: 'User already registered',status: HttpStatusCode.CONFLICT };
  const user = await User.create({ name, email, password: codedPassword, role });
  const { password: _, ...userWithoutPassword } = user.dataValues;
  return { status: HttpStatusCode.CREATED, result: userWithoutPassword };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  if (!users) return { message: 'User does not exist', status: HttpStatusCode.NOT_FOUND };
  return { result: users, status: HttpStatusCode.OK };
}

module.exports = { register, admRegister, getAllUsers };
