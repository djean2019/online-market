const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// var path = require('path');

const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/auth-routes');
const auth = require('./util/jwt-auth');

const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(auth.verifyToken);
app.use(userRoutes);

module.exports = app;
