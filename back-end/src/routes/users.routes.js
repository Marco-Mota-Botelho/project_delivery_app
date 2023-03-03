const { Router } = require('express');
const UsersController = require('../controllers/UsersController');

const usersRoutes = Router();
const registerRoutes = Router();

usersRoutes.post('/', UsersController.login);
registerRoutes.post('/', UsersController.register);
registerRoutes.post('/manage', UsersController.admRegister);

module.exports = { usersRoutes, registerRoutes };
