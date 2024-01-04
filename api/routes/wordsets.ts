import express from 'express';
import checkAuth from '../middleware/check-auth.js';
import * as WordsetController from '../controllers/WordsetsController.js';

export const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Wordsets
 *  description: Wordsets section
 */

/**
 * @swagger
 * /api/wordsets:
 *   get:
 *     summary: Get all wordsets
 *     description: Endpoint to retrieve all wordsets.
 *     tags:
 *       - Wordsets
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               count: 2
 *               wordsets:
 *                 - _id: "5ff9b359c37f713e6c6a3e1a"
 *                   request:
 *                     type: "GET"
 *                     url: "https://localhost/api/wordsets/5ff9b359c37f713e6c6a3e1a"
 *                 - _id: "5ff9b359c37f713e6c6a3e1b"
 *                   request:
 *                     type: "GET"
 *                     url: "https://localhost/api/wordsets/5ff9b359c37f713e6c6a3e1b"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error. Please try again later."
 */
router.get('/', checkAuth, WordsetController.wordsets_get_all);

/**
 * @swagger
 * /api/wordsets:
 *   post:
 *     summary: Create a new wordset
 *     description: Endpoint to create a new wordset.
 *     tags:
 *       - Wordsets
 *     requestBody:
 *       description: Wordset data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Wordset'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               createdWordset:
 *                 wordsetName: "My Wordset"
 *                 languageFrom: "english"
 *                 languageTo: "spanish"
 *                 words:
 *                   - nameFrom: "hello"
 *                     nameTo: "hola"
 *                   - nameFrom: "world"
 *                     nameTo: "mundo"
 *                 _id: "5ff9b359c37f713e6c6a3e1a"
 *                 request:
 *                   type: "GET"
 *                   url: "https://localhost/api/wordsets/5ff9b359c37f713e6c6a3e1a"
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input data."
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error. Please try again later."
 */
router.post('/', checkAuth, WordsetController.wordsets_create_wordset);

/**
 * @swagger
 * /api/wordsets/{wordsetId}:
 *   get:
 *     summary: Get a wordset by ID
 *     description: Endpoint to retrieve a wordset by its ID.
 *     tags:
 *       - Wordsets
 *     parameters:
 *       - in: path
 *         name: wordsetId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the wordset to retrieve.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               wordset:
 *                 _id: "5ff9b359c37f713e6c6a3e1a"
 *                 userId: "5ff9b359c37f713e6c6a3e1b"
 *                 wordsetName: "My Wordset"
 *                 languageFrom: "english"
 *                 languageTo: "spanish"
 *                 words:
 *                   - nameFrom: "hello"
 *                     nameTo: "hola"
 *                   - nameFrom: "world"
 *                     nameTo: "mundo"
 *               request:
 *                 type: "GET"
 *                 url: "https://localhost/api/wordsets"
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               error: "Wordset not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error. Please try again later."
 */
router.get('/:wordsetId', checkAuth, WordsetController.wordsets_get_order);

/**
 * @swagger
 * /api/wordsets/{wordsetId}:
 *   delete:
 *     summary: Delete a wordset by ID
 *     description: Endpoint to delete a wordset by its ID.
 *     tags:
 *       - Wordsets
 *     parameters:
 *       - in: path
 *         name: wordsetId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the wordset to delete.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               message: "Wordset deleted"
 *               request:
 *                 type: "POST"
 *                 url: "https://localhost/api/wordsets"
 *                 body:
 *                   wordId: "ID"
 *                   elements: "Number"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error. Please try again later."
 */
router.delete(
	'/:wordsetId',
	checkAuth,
	WordsetController.wordsets_delete_wordset
);
