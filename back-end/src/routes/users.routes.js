const { Router } = require('express');
const UsersController = require('../controllers/UsersController');

const usersRoutes = Router();

usersRoutes.post('/register', UsersController.register);
usersRoutes.post('/register/manage', UsersController.admRegister);
usersRoutes.get('/', UsersController.getAllUsers);


module.exports = usersRoutes;
