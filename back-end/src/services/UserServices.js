const { User } = require('../database/models');

const login = async (email) => {
  const result = await User.findOne({ where: { email } });
  if (!result) return { status: 404, message: 'Not found' };

  return { status: 200, result };
};

module.exports = { login };