const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");
const productRoutes = require("./routes/product-routes");
const adminRoutes = require("./routes/admin-routes");
const orderRoutes = require("./routes/order-routes");
const auth = require("./util/jwt-auth");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(authRoutes);
// app.use(auth.verifyToken);
app.use(adminRoutes);
app.use(orderRoutes);
app.use(userRoutes);
app.use(productRoutes);

//error
app.use((req, res, next) => {
    const error = new Error("Page not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { message: error.message },
    });
});
module.exports = app;
