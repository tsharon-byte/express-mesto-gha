const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const usersRoute = require('./routes/user');
const cardsRoute = require('./routes/card');
const authRoute = require('./routes/auth');
const pageNotFound = require('./middlewares/pageNotFound');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const server = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

// подключаем rate-limiter
server.use(limiter);
server.use(helmet());
server.use(bodyParser.json());
server.use(cookieParser());

server.use(requestLogger);

server.use('/', authRoute);
server.use(auth);
server.use('/users', usersRoute);
server.use('/cards', cardsRoute);
server.use(pageNotFound);

server.use(errorLogger);

server.use(errors());
server.use(errorHandler);
server.listen(process.env.PORT || 3000);
