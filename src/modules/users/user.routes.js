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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get my profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 *   patch:
 *     summary: Update my profile
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ulug Dev
 *               email:
 *                 type: string
 *                 example: ulug@gmail.com
 *     responses:
 *       200:
 *         description: Profile updated
 *
 * /api/users/me/change-password:
 *   patch:
 *     summary: Change password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "654321"
 *               confirmPassword:
 *                 type: string
 *                 example: "654321"
 *     responses:
 *       200:
 *         description: Password changed
 *
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, customer]
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
 *         description: List of users
 *
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */

module.exports = router;
