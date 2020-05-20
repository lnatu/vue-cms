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
const categoryRouter = require('./../routes/categoryRoutes');
const productRouter = require('./../routes/productRoutes');
const orderRouter = require('./../routes/orderRoutes');
const orderDetailRouter = require('./../routes/orderDetailRoutes');
const userRouter = require('./../routes/userRoutes');
const supplierRouter = require('./../routes/supplierRoutes');
const groupRouter = require('./../routes/groupRoutes');

app.use(`${apiVersion}/categories`, categoryRouter);
app.use(`${apiVersion}/groups`, groupRouter);
app.use(`${apiVersion}/products`, productRouter);
app.use(`${apiVersion}/ordersDetail`, orderDetailRouter);
app.use(`${apiVersion}/orders`, orderRouter);
app.use(`${apiVersion}/users`, userRouter);
app.use(`${apiVersion}/suppliers`, supplierRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorController);

module.exports = app;
