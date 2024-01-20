import mongoose from 'mongoose';
import IWordsetHistory from '../interfaces/IWordsetHistory.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     WordsetHistory:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: ObjectId
 *           description: "User ID associated with the wordset history."
 *         wordsetId:
 *           type: string
 *           format: ObjectId
 *           description: "Wordset ID associated with the wordset history."
 *         finishDate:
 *           type: string
 *           format: date
 *           description: "Date when the wordset history was finished."
 *         timeElapsed:
 *           type: number
 *           description: "Time elapsed while working on the wordset history in seconds."
 *         fails:
 *           type: number
 *           description: "Number of fails during working on the wordset."
 *         languageFrom:
 *           type: string
 *           description: "Source language for the wordset history."
 *         languageTo:
 *           type: string
 *           description: "Target language for the wordset history."
 */
const wordsetHistorySchema = new mongoose.Schema<IWordsetHistory>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	wordsetId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Wordset',
	},
	finishDate: { type: Date, required: true },
	timeElapsed: { type: Number, required: true },
	fails: { type: Number },
	languageFrom: { type: String },
	languageTo: { type: String },
});

export const WordsetHistory = mongoose.model<IWordsetHistory>(
	'WordsetHistory',
	wordsetHistorySchema
);
