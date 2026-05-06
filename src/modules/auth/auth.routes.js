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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ulug Dev
 *               email:
 *                 type: string
 *                 example: ulug@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: ulug@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

module.exports = router;
