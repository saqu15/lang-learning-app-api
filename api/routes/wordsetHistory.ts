import express from 'express';
import checkAuth from '../middleware/check-auth.js';
import * as WordsetHistoryController from '../controllers/WordsetHistoryController.js';

/**
 * @swagger
 * tags:
 *  name: Wordset history
 *  description: History of wordsets completed by user
 */
export const router = express.Router();

/**
 * @swagger
 * paths:
 *   /api/wordset-history:
 *     post:
 *       summary: Create a new wordset history entry
 *       tags:
 *         - Wordset history
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 wordset:
 *                   $ref: '#/components/schemas/Wordset'
 *                 finishDate:
 *                   type: string
 *                   format: date
 *                   description: "Date when the wordset history was finished."
 *                 timeElapsed:
 *                   type: number
 *                   description: "Time elapsed while working on the wordset history in seconds."
 *                 fails:
 *                   type: number
 *                   description: "Number of fails during working on the wordset history."
 *               required:
 *                 - wordset
 *                 - finishDate
 *                 - timeElapsed
 *       responses:
 *         '201':
 *           description: Wordset history saved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: "Success message."
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: "Error message."
 */
router.post(
	'/',
	checkAuth,
	WordsetHistoryController.wordset_history_add_wordset_to_history
);

/**
 * @swagger
 * paths:
 *   /api/wordset-history/{wordsetId}:
 *     get:
 *       summary: Get Wordset History for a specific user and wordset
 *       tags:
 *         - Wordset history
 *       parameters:
 *         - in: path
 *           name: wordsetId
 *           required: true
 *           schema:
 *             type: string
 *           description: "ID of the wordset to retrieve history for"
 *       responses:
 *         '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/WordsetHistory'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: "Error message."
 */
router.get(
	'/:wordsetId',
	checkAuth,
	WordsetHistoryController.wordset_history_get_user_wordset_history
);
