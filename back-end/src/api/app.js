const express = require('express');
const cors = require('cors');
const ErrorHandler = require('../middlewares/ErrorHandler');
const usersRoutes = require('../routes/users.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(ErrorHandler.handler);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', usersRoutes);

module.exports = app;
