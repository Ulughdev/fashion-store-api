const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes (keyinroq qo'shamiz)
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/products", require("./modules/products/product.routes"));
app.use("/api/orders", require("./modules/orders/order.routes"));
// app.js ga qo'shing
app.use("/api/categories", require("./modules/categories/category.routes"));
app.use("/api/orders", require("./modules/orders/order.routes"));
app.use(errorHandler);

module.exports = app;
