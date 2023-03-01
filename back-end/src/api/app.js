const express = require('express');
const cors = require('cors');
const ErrorHandler = require('../middlewares/ErrorHandler');
const productsRoutes = require('../routes/products.routes');
const { usersRoutes, registerRoutes } = require('../routes/users.routes');
const salesRoutes = require('../routes/sales.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(ErrorHandler.handler);

app.use('/login', usersRoutes);
app.use('/products', productsRoutes);
app.use('/register', registerRoutes);
app.use('/sales', salesRoutes);

app.use('/images', express.static('public'));
app.get('/coffee', (_req, res) => res.status(418).end());
module.exports = app;
