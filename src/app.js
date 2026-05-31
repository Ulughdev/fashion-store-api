const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/products", require("./modules/products/product.routes"));
app.use("/api/categories", require("./modules/categories/category.routes"));
app.use("/api/orders", require("./modules/orders/order.routes"));
app.use("/api/users", require("./modules/users/user.routes"));
app.use("/api/chat", require("./modules/chat/chat.routes"));

app.use(errorHandler);

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
