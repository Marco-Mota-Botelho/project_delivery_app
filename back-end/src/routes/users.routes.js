const { Router } = require('express');
const UsersController = require('../controllers/UsersController');

const usersRoutes = Router();

usersRoutes.post('/register', UsersController.register);
usersRoutes.post('/login', UsersController.login);

module.exports = usersRoutes;
