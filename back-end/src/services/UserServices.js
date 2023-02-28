const { User } = require('../database/models')

const login = async (email, password) => {
  const result = await User.findOne({ where: { email, password }});
  if(!result) return { status: 404, message: 'Not found' };
  return { status: 404, result };
}

module.exports = { login };