const { Router } = require('express');
const SalesController = require('../controllers/SalesController');

const salesRoutes = Router();

salesRoutes.post('/', SalesController.create);

module.exports = salesRoutes;