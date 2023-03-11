const md5 = require('md5');
const { User } = require('../database/models');
const HttpStatusCode = require('../utils/HttpStatusCode');
const { createToken } = require('../auth/jsonWebToken');

const register = async ({ name, email, password }) => {
  const codedPassword = md5(password);
  const findUser = await User.findOne({ where: { email } });
  if (findUser) return { message: 'User already registered' ,status: HttpStatusCode.CONFLICT };
  const user = await User.create({ name, email, password: codedPassword });
  const { password: _, ...userWithoutPassword } = user.dataValues;
  const token = createToken({ name: user.name, email: user.email, role: user.role });
  return { status: HttpStatusCode.CREATED, result: { ...userWithoutPassword, token } };
};

const admRegister = async ({ name, email, password, role }) => {
  console.log(role);
  const codedPassword = md5(password);
  const findUser = await User.findOne({ where: { email } });
  if (findUser) return { message: 'User already registered',status: HttpStatusCode.CONFLICT };
  const user = await User.create({ name, email, password: codedPassword, role });
  const { password: _, ...userWithoutPassword } = user.dataValues;
  return { status: HttpStatusCode.CREATED, result: userWithoutPassword };
};


const getAllUsers = async () => {
  const users = await User.findAll(
    { where: { role: ['customer', 'seller'] } },
    { attributes: { exclude: ['password'] } },
    );
  if (!users) return { message: 'User does not exist', status: HttpStatusCode.NOT_FOUND };
  return { result: users, status: HttpStatusCode.OK };
}

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  return true;
};

const getAllSellers = async () => {
  const result = await User.findAll({ where: { role: 'seller'}});

  if (!result) return { message: 'Not Found', status: HttpStatusCode.NOT_FOUND };
  return { result, status: HttpStatusCode.OK }
}

module.exports = { register, admRegister, getAllUsers, deleteUser, getAllSellers };
