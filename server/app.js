// Core
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('../config/keys');

// Routes
const authRoutes = require('./routes/auth.router');
const analyticsRoutes = require('./routes/analytics.router');
const categoryRoutes = require('./routes/category.router');
const orderRoutes = require('./routes/order.router');
const positionRoutes = require('./routes/position.router');

// Initialization
const app = express();
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('mongoDB: connection success'))
  .catch(() => console.log('mongoDB connection failed'));

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());
require('./middleware/passport.middleware')(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// URLs
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category',  categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

module.exports = app;