const router = require("express").Router();
const authController = require("./auth.controller");
const authenticate = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { registerSchema, loginSchema } = require("./auth.validation");

// Public routes
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", authController.refresh);

// Private routes
router.post("/logout", authenticate, authController.logout);

module.exports = router;
