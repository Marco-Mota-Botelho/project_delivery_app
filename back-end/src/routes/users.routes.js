const { Router } = require('express');
const UsersController = require('../controllers/UsersController');

const usersRoutes = Router();

usersRoutes.post('/register', UsersController.register);
usersRoutes.post('/register/manage', UsersController.admRegister);
usersRoutes.get('/', UsersController.getAllUsers);
usersRoutes.delete('/:id', UsersController.deleteUser);
usersRoutes.get('/seller', UsersController.getAllSellers);

module.exports = usersRoutes;
