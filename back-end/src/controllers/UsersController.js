const UserServices = require('../services/UserServices');

const login = async (req, res) => {
  const { email } = req.body;
  const { status, result, message } = await UserServices.login(email);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(result);
};

module.exports = { login };