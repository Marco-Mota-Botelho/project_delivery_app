const fs = require('fs');

const secret = fs.readFileSync('./jwt.evaluation.key');
const jwt = require('jsonwebtoken');
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
  const result = await UserServices.getAllUsers();
  if (!result) return res.status(400).json({ message: 'No users' });
  return res.status(200).json(result);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);
  if (result === false) return res.status(401).json({ message: 'No such user' });
  if (result === true) return res.status(204).json();
};

module.exports = { login, register, admRegister, getAllUsers, deleteUser };