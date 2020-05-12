const express = require('express');
const morgan = require('morgan');
const AppError = require('./../utils/AppError');
const ErrorController = require('./../controllers/ErrorController');

const app = express();

// 1. Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

const apiVersion = '/api/v1';

// 2. Routes
const userRouter = require('./../routes/userRoutes');
const productRouter = require('./../routes/productRoutes');
const supplierRouter = require('./../routes/supplierRoutes');
const groupRouter = require('./../routes/groupRoutes');

app.use(`${apiVersion}/users`, userRouter);
app.use(`${apiVersion}/products`, productRouter);
app.use(`${apiVersion}/suppliers`, supplierRouter);
app.use(`${apiVersion}/groups`, groupRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorController);

module.exports = app;
