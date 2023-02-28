const express = require('express');
const  ErrorHandler = require('../middlewares/ErrorHandler');
const usersRoutes = require('../routes/users.routes');

const app = express();

app.use(express.json());
app.use(ErrorHandler.handler);
app.use('/login', usersRoutes)
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
