const LoginServices = require('../services/LoginServices');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, result, message } = await LoginServices.login({ email, password });
  if (message) return res.status(status).json({ message });
  return res.status(status).json(result);
};

module.exports = { login };