import express from 'express';
import checkAuth from '../middleware/check-auth.js';
import * as UserWordsetsController from '../controllers/UserWordsetsController.js';

/**
 * @swagger
 * tags:
 *  name: User wordsets
 *  description: User wordsets endpoints
 */
export const router = express.Router();

/**
 * @swagger
 * /api/user-wordsets:
 *   post:
 *     summary: Add a word set to a user
 *     description: Adds a new word set to a user based on the UserWordset model.
 *     tags:
 *       - User wordsets
 *     requestBody:
 *       description: The UserWordset model to be passed in the request body.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserWordset'
 *     responses:
 *       201:
 *         description: Word set has been added to the user.
 *         content:
 *           application/json:
 *             example:
 *               message: Wordset added to user.
 *       400:
 *         description: Invalid input data.
 *       409:
 *         description: Conflict - Wordset is already added to user collection.
 *         content:
 *           application/json:
 *             example:
 *               message: Wordset is already added to user collection
 *       500:
 *         description: An error occurred while processing the request.
 */
router.post(
	'/',
	checkAuth,
	UserWordsetsController.user_wordsets_add_wordset_to_user
);

/**
 * @swagger
 * /api/user-wordsets:
 *   get:
 *     summary: Get user-associated wordsets
 *     description: Retrieves wordsets associated with the user.
 *     tags:
 *       - User wordsets
 *     responses:
 *       200:
 *         description: Successfully retrieved user-associated wordsets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wordset'
 *       500:
 *         description: An error occurred while processing the request.
 */

router.get(
	'/',
	checkAuth,
	UserWordsetsController.user_wordsets_get_user_wordsets
);
