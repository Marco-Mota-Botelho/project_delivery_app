const { Router } = require('express');
const UsersController = require('../controllers/UsersController');

const usersRoutes = Router();

usersRoutes.post('/', UsersController.login);

module.exports = usersRoutes;
