const md5 = require('md5');
const { createToken } = require('../auth/jsonWebToken');
const HttpStatusCode = require('../utils/HttpStatusCode');
const { User } = require('../database/models');

const login = async ({ email, password }) => {
  const result = await User.findOne({ where: { email } });
  
  if (!result) return { status: HttpStatusCode.NOT_FOUND, message: 'Not found' };

  const codedPassword = md5(password);


  const token = createToken({ name: result.name, email: result.email, role: result.role });

  if (codedPassword !== result.password) {
    return { status: HttpStatusCode.UNAUTHORIZED, message: 'Invalid password' };
  }
  const { password: _, ...userWithoutPassword } = result.dataValues;
  return { status: HttpStatusCode.OK, result: { ...userWithoutPassword, token } };
};

module.exports = { login };