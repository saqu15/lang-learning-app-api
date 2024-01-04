import mongoose from 'mongoose';
import IWordset from '../interfaces/IWordset.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Word:
 *       type: object
 *       properties:
 *         nameFrom:
 *           type: string
 *           description: "Source name of the word."
 *         nameTo:
 *           type: string
 *           description: "Target name of the word."
 *
 *     Wordset:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: "User ID associated with the wordset."
 *         wordsetName:
 *           type: string
 *           description: "Name of the wordset."
 *         languageFrom:
 *           type: string
 *           description: "Source language of the wordset."
 *         languageTo:
 *           type: string
 *           description: "Target language of the wordset."
 *         words:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Word'
 */
const wordsetSchema = new mongoose.Schema<IWordset>({
	userId: { type: mongoose.Schema.Types.ObjectId, required: true },
	wordsetName: { type: String, required: true },
	languageFrom: { type: String, required: true },
	languageTo: { type: String, required: true },
	words: [
		{
			nameFrom: { type: String, required: true },
			nameTo: { type: String, required: true },
		},
	],
});

export const Wordset = mongoose.model<IWordset>('Wordset', wordsetSchema);
