const router = require("express").Router();
const productController = require("./product.controller");
const authenticate = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const validate = require("../../middlewares/validate");
const { createProductSchema, reviewSchema } = require("./product.validation");

// Public routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

// Customer routes
router.post(
  "/:id/reviews",
  authenticate,
  validate(reviewSchema),
  productController.addReview,
);

// Admin routes
router.post(
  "/",
  authenticate,
  isAdmin,
  validate(createProductSchema),
  productController.createProduct,
);
router.put("/:id", authenticate, isAdmin, productController.updateProduct);
router.delete("/:id", authenticate, isAdmin, productController.deleteProduct);

module.exports = router;
