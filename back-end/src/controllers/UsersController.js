const UserServices = require('../services/UserServices');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, result, message, token } = await UserServices.login({ email, password });
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ ...result, token });
};

module.exports = { login };