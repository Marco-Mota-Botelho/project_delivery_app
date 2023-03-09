const fs = require('fs');

const secret = fs.readFileSync('./jwt.evaluation.key');
const jwt = require('jsonwebtoken');
const UserServices = require('../services/UserServices');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const { status, result, message } = await UserServices.register({ name, email, password });
  if (message) return res.status(status).json({ message });
  return res.status(status).json(result);
};

const admRegister = async (req, res) => {
  const token = req.headers.authorization;
    const verify = jwt.verify(token, secret);
    if (verify.role === 'administrator') {
      const err = new Error('Usuário não autorizado');
      err.name = 'UnauthorizedError';
    }
  const { name, email, password, role } = req.body;
  const { status, result, message } = await UserServices
    .admRegister({ name, email, password, role });
  if (message) return res.status(status).json({ message });
  return res.status(status).json(result);
};

const getAllUsers = async (_req, res) => {
  const { status, result, message } = await UserServices.getAllUsers();
  if (message) return res.status(status).json({ message });
  return res.status(status).json(result);
}

module.exports = { register, admRegister, getAllUsers };