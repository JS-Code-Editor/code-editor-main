const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

require('./configs/db').connect();

const indexRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(logger('dev'));
// serve static files:
// app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const swaggerDoc = require('./docs');

app.use('/api-docs', [swaggerUi.serve, swaggerUi.setup(swaggerDoc)]);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  const status = err.status || 500;
  const error = {
    status,
    message: err.message,
  };

  res.status(status);
  res.json({
    error,
  });
});

module.exports = app;
