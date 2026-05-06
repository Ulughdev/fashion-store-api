const router = require("express").Router();
const categoryController = require("./category.controller");
const authenticate = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const validate = require("../../middlewares/validate");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("./category.validation");

// Public routes
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

// Admin routes
router.post(
  "/",
  authenticate,
  isAdmin,
  validate(createCategorySchema),
  categoryController.createCategory,
);
router.put(
  "/:id",
  authenticate,
  isAdmin,
  validate(updateCategorySchema),
  categoryController.updateCategory,
);
router.delete("/:id", authenticate, isAdmin, categoryController.deleteCategory);

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security: []
 *     responses:
 *       200:
 *         description: List of categories
 *   post:
 *     summary: Create a category (Admin only)
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Erkaklar
 *               parent:
 *                 type: string
 *                 example: 69fb020c8ed9e0b251a6a07b
 *               image:
 *                 type: string
 *                 example: https://example.com/men.jpg
 *     responses:
 *       201:
 *         description: Category created
 *       403:
 *         description: Access denied
 *
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 *   put:
 *     summary: Update category (Admin only)
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category updated
 *   delete:
 *     summary: Delete category (Admin only)
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 */

module.exports = router;
