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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [men, women, unisex, kids]
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *           enum: [XS, S, M, L, XL, XXL]
 *       - in: query
 *         name: season
 *         schema:
 *           type: string
 *           enum: [spring, summer, autumn, winter, all-season]
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, price-low, price-high, rating]
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
 *         description: List of products
 *   post:
 *     summary: Create a product (Admin only)
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - brand
 *               - gender
 *               - season
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: Classic T-Shirt
 *               price:
 *                 type: number
 *                 example: 29.99
 *               brand:
 *                 type: string
 *                 example: FashionBrand
 *               gender:
 *                 type: string
 *                 enum: [men, women, unisex, kids]
 *               season:
 *                 type: string
 *                 enum: [spring, summer, autumn, winter, all-season]
 *               category:
 *                 type: string
 *                 example: 69fb020c8ed9e0b251a6a07b
 *     responses:
 *       201:
 *         description: Product created
 *       403:
 *         description: Access denied
 *
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update product (Admin only)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated
 *   delete:
 *     summary: Delete product (Admin only)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */

module.exports = router;
