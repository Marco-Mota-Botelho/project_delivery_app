const UserServices = require('../services/UserServices');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, result, message, token } = await UserServices.login({ email, password });
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ ...result, token });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const { status, result, message } = await UserServices.register({ name, email, password });
  if (message) return res.status(status).json({ message });
  return res.status(status).json(result);
};

module.exports = { login, register };