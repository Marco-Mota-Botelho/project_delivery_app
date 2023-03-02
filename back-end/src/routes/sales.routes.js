const { Router } = require('express');
const SalesController = require('../controllers/SalesController');

const salesRoutes = Router();

salesRoutes.post('/', SalesController.create);

salesRoutes.get('/saleId/:id', SalesController.getSalesBySaleId);

salesRoutes.get('/:id', SalesController.getByUserId);

module.exports = salesRoutes;
