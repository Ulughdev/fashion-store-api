const router = require("express").Router();
const {
  register,
  login,
  refresh,
  logout,
  registerAdmin,
} = require("./auth.controller");
const authenticate = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const {
  registerSchema,
  loginSchema,
  registerAdminSchema,
} = require("./auth.validation");

// Public routes
router.post("/register", validate(registerSchema), register);
router.post("/register-admin", validate(registerAdminSchema), registerAdmin);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);

// Private routes
router.post("/logout", authenticate, logout);

module.exports = router;
