import express from 'express';
import checkAuth from '../middleware/check-auth.js';
import * as UserController from '../controllers/UserController.js';

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User endpoints
 */
export const router = express.Router();

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint for registering a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: User's login name.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password.
 *             required:
 *               - login
 *               - email
 *               - password
 *           example:
 *             login: john_doe
 *             email: john.doe@example.com
 *             password: secretPassword123
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: User created
 *       '409':
 *         description: Conflict - User with this email already exists.
 *         content:
 *           application/json:
 *             example:
 *               message: User with this email already exists
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error during user registration
 */
router.post('/signup', UserController.user_signup);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Authenticate user
 *     description: Endpoint for authenticating a user based on login credentials.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address for login.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password for login.
 *             required:
 *               - email
 *               - password
 *           example:
 *             email: john.doe@example.com
 *             password: secretPassword123
 *     responses:
 *       '200':
 *         description: Authentication successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Auth successful
 *               token: <generated_jwt_token>
 *       '401':
 *         description: Unauthorized - Wrong login data.
 *         content:
 *           application/json:
 *             example:
 *               message: Wrong login data
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error during user authentication
 */
router.post('/login', UserController.user_login);

/**
 * @swagger
 * /api/user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Endpoint for deleting a user by their user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: User deleted
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error during user deletion
 */
router.delete('/:userId', checkAuth, UserController.user_delete_user);

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve user details by their user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to be retrieved.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error during user retrieval
 */
router.get('/:userId', checkAuth, UserController.user_get_user);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get current user
 *     description: Retrieve current user details.
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: User found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error during user retrieval
 */
router.get('/', checkAuth, UserController.user_get_current_user);
