const router = require("express").Router();
const userController = require("./user.controller");
const authenticate = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const validate = require("../../middlewares/validate");
const { updateMeSchema, changePasswordSchema } = require("./user.validation");

// Customer routes
router.get("/me", authenticate, userController.getMe);
router.patch(
  "/me",
  authenticate,
  validate(updateMeSchema),
  userController.updateMe,
);
router.patch(
  "/me/change-password",
  authenticate,
  validate(changePasswordSchema),
  userController.changePassword,
);

// Admin routes
router.get("/", authenticate, isAdmin, userController.getAllUsers);
router.delete("/:id", authenticate, isAdmin, userController.deleteUser);

module.exports = router;
