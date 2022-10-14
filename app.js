const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/user');
const cardsRoute = require('./routes/card');
const pageNotFound = require('./middlewares/pageNotFound');
const errorHandler = require('./middlewares/errorHandler');

const server = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
server.use((req, res, next) => {
  req.user = {
    _id: '63462e50311689c8240da3c9',
  };
  next();
});
server.use(bodyParser.json());
server.use('/users', usersRoute);
server.use('/cards', cardsRoute);
server.use(pageNotFound);
server.use(errorHandler);
server.listen(process.env.PORT || 3000);
