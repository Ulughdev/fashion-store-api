const router = require("express").Router();
const orderController = require("./order.controller");
const authenticate = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const validate = require("../../middlewares/validate");
const { createOrderSchema, updateStatusSchema } = require("./order.validation");

// Customer routes
router.post(
  "/",
  authenticate,
  validate(createOrderSchema),
  orderController.createOrder,
);
router.get("/my-orders", authenticate, orderController.getMyOrders);
router.get("/:id", authenticate, orderController.getOrderById);
router.patch("/:id/cancel", authenticate, orderController.cancelOrder);

// Admin routes
router.get("/", authenticate, isAdmin, orderController.getAllOrders);
router.patch(
  "/:id/status",
  authenticate,
  isAdmin,
  validate(updateStatusSchema),
  orderController.updateOrderStatus,
);

module.exports = router;
