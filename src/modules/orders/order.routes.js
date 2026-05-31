const router = require("express").Router();
const orderController = require("./order.controller");
const authenticate = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const validate = require("../../middlewares/validate");
const { createOrderSchema, updateStatusSchema } = require("./order.validation");

// Custom middleware: maps frontend simple order fields to backend Joi/DB fields
const mapFrontendOrderPayload = (req, res, next) => {
  if (req.body) {
    if (req.body.items && Array.isArray(req.body.items)) {
      req.body.items = req.body.items.map(item => {
        if (item.product && !item.productId) {
          item.productId = item.product;
        }
        return item;
      });
    }
    if (req.body.shippingAddress && req.body.shippingAddress.address && !req.body.shippingAddress.street) {
      req.body.shippingAddress.street = req.body.shippingAddress.address;
    }
  }
  next();
};

// Customer routes
router.post(
  "/",
  authenticate,
  mapFrontendOrderPayload,
  validate(createOrderSchema),
  orderController.createOrder,
);
router.get("/my-orders", authenticate, orderController.getMyOrders);
router.get("/my", authenticate, orderController.getMyOrders); // Alias for frontend compatibility
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

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create an order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - shippingAddress
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 69fb02798ed9e0b251a6a07c
 *                     size:
 *                       type: string
 *                       enum: [XS, S, M, L, XL, XXL]
 *                     color:
 *                       type: string
 *                       example: Oq
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: Ulug Dev
 *                   phone:
 *                     type: string
 *                     example: "+998901234567"
 *                   street:
 *                     type: string
 *                     example: Amir Temur 1
 *                   city:
 *                     type: string
 *                     example: Toshkent
 *                   country:
 *                     type: string
 *                     example: Uzbekistan
 *               notes:
 *                 type: string
 *                 example: Tez yetkazib bering!
 *     responses:
 *       201:
 *         description: Order created
 *       404:
 *         description: Product not found
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of orders
 *
 * /api/orders/my-orders:
 *   get:
 *     summary: Get my orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of my orders
 *
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *
 * /api/orders/{id}/cancel:
 *   patch:
 *     summary: Cancel order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled
 *
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated
 */

module.exports = router;
