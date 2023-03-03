const { Router } = require('express');
const SalesController = require('../controllers/SalesController');

const salesRoutes = Router();

salesRoutes.post('/', SalesController.create);

salesRoutes.get('/saleId/:id', SalesController.getSalesBySaleId);

salesRoutes.get('/customer/:id', SalesController.getByUserId);

salesRoutes.get('/seller/:id', SalesController.getBySellerId);

salesRoutes.put('/seller/updateStatus/:id', SalesController.updateStatusSale);

module.exports = salesRoutes;
