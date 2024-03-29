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
 *         id:
 *           type: string
 *           format: uuid
 *           description: "Wordset ID."
 *         userId:
 *           type: string
 *           format: uuid
 *           description: "User ID associated with the wordset."
 *         userName:
 *           type: string
 *           description: "Author name."
 *         wordsetName:
 *           type: string
 *           description: "Name of the wordset."
 *         languageFrom:
 *           $ref: '#/components/schemas/Languages'
 *           description: "Source language of the wordset."
 *         languageTo:
 *           $ref: '#/components/schemas/Languages'
 *           description: "Target language of the wordset."
 *         words:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Word'
 *         ownerId:
 *           type: string
 *           format: uuid
 *           description: "Id of user added to wordset."
 *         description:
 *           type: string
 *           description: "Description of wordset."
 */
const wordsetSchema = new mongoose.Schema<IWordset>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	wordsetName: { type: String, required: true },
	languageFrom: { type: String, required: true },
	languageTo: { type: String, required: true },
	words: [
		{
			nameFrom: { type: String, required: true },
			nameTo: { type: String, required: true },
		},
	],
	description: { type: String },
});

export const Wordset = mongoose.model<IWordset>('Wordset', wordsetSchema);
