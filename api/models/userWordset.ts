import mongoose from 'mongoose';
import IUserWordset from '../interfaces/IUserWordset.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     UserWordset:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: "User ID associated with the wordset."
 *         wordsetId:
 *           type: string
 *           format: uuid
 *           description: "Wordset ID associated with the user."
 */
const userWordsetSchema = new mongoose.Schema<IUserWordset>({
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
});

export const UserWordset = mongoose.model<IUserWordset>(
	'UserWordset',
	userWordsetSchema
);
