const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");
const productRoutes = require("./routes/product-routes");
const auth = require("./util/jwt-auth");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(authRoutes);
// app.use(auth.verifyToken);
app.use(adminRoutes);
app.use(userRoutes);
app.use(productRoutes);

//
module.exports = app;
