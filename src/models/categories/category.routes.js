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

module.exports = router;
