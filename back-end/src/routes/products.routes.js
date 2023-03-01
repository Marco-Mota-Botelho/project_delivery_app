const { Router } = require('express');
const ProductController = require('../controllers/ProductController');

const productsRoutes = Router();

productsRoutes.get('/', ProductController.getAllProducts);

module.exports = productsRoutes;
