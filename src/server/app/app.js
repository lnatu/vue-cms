const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

const apiVersion = '/api/v1';

// 2. Routes
const userRouter = require('./../routes/userRoutes');

app.use(`${apiVersion}/users`, userRouter);

module.exports = app;
