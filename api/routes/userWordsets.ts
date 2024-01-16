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

/**
 * @swagger
 * /api/user-wordsets:
 *   delete:
 *     summary: Delete a user-associated wordset
 *     description: Deletes a user-associated wordset for a specific user.
 *     tags:
 *       - User wordsets
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user for whom the wordset is associated.
 *       - in: query
 *         name: userWordsetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user-associated wordset to delete.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User wordset deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 request:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: The HTTP request method (POST).
 *                     url:
 *                       type: string
 *                       description: The URL to create a new user wordset.
 *                     body:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: string
 *                           description: The ID of the user.
 *                         wordsetId:
 *                           type: string
 *                           description: The ID of the deleted wordset.
 *       401:
 *         description: Unauthorized. The user does not have permission to delete this wordset.
 *       500:
 *         description: Internal server error. An error occurred while processing the request.
 */
router.delete(
	'/',
	checkAuth,
	UserWordsetsController.user_wordsets_delete_user_wordset
);
