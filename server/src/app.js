require('dotenv').config()
const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors')

const errorHandler = require('./middlewares/errorHandler');
const authHandler = require('./middlewares/authHandler');

const categories = require('./routes/category');
const users = require('./routes/user');
const dashboards = require('./routes/dashboard');
const bookmarks = require('./routes/bookmark');


mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(authHandler);
app.use('/categories', categories);
app.use('/users', users)
app.use('/dashboards', dashboards)
app.use('/bookmarks', bookmarks)
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
app.use(errorHandler);

module.exports = app