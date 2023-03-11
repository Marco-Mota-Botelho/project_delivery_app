const express = require('express');
const cors = require('cors');
const ErrorHandler = require('../middlewares/ErrorHandler');
const productsRoutes = require('../routes/products.routes');
const usersRoutes = require('../routes/users.routes');
const loginRoutes = require('../routes/login.routes');
const salesRoutes = require('../routes/sales.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(ErrorHandler.handler);

app.use('/login', loginRoutes);
app.use('/user', usersRoutes);
app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.use('/images', express.static('public'));
app.get('/coffee', (_req, res) => res.status(418).end());
module.exports = app;
