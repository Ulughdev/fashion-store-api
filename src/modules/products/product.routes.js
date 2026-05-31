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

// Custom middleware: formats frontend simple arrays to backend structured objects
const mapFrontendProductPayload = (req, res, next) => {
  if (req.body) {
    const { sizes, colors, stock = 0 } = req.body;
    
    if (sizes && Array.isArray(sizes)) {
      req.body.sizes = sizes.map(s => {
        if (typeof s === "string") {
          return { size: s.trim().toUpperCase(), stock: Number(stock) };
        }
        return s;
      });
    }

    if (colors && Array.isArray(colors)) {
      req.body.colors = colors.map(c => {
        if (typeof c === "string") {
          const hexMap = {
            "qora": "#000000",
            "oq": "#ffffff",
            "qizil": "#ff0000",
            "ko'k": "#0000ff",
            "yashil": "#008000",
            "sariq": "#ffff00",
            "pushti": "#ffc0cb",
            "kulrang": "#808080",
            "jigarrang": "#a52a2a",
            "olovrang": "#ffa500",
            "binafsharang": "#800080"
          };
          const name = c.trim();
          const hex = hexMap[name.toLowerCase()] || "#000000";
          return { name, hex, stock: Number(stock), images: [] };
        }
        return c;
      });
    }

    // Joi validatsiyasida xato bermasligi uchun keraksiz maydonlarni o'chiramiz
    delete req.body.stock;

    if (req.body.discountPrice === "" || req.body.discountPrice === null || req.body.discountPrice === undefined || isNaN(Number(req.body.discountPrice))) {
      delete req.body.discountPrice;
    } else {
      req.body.discountPrice = Number(req.body.discountPrice);
    }
  }
  next();
};

// Admin routes
router.post(
  "/",
  authenticate,
  isAdmin,
  mapFrontendProductPayload,
  validate(createProductSchema),
  productController.createProduct,
);
router.put(
  "/:id",
  authenticate,
  isAdmin,
  mapFrontendProductPayload,
  productController.updateProduct,
);
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
