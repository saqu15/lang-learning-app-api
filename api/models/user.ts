import mongoose from 'mongoose';
import IUser from '../interfaces/IUser.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         login:
 *           type: string
 *           description: Login name of the user.
 *           example: john_doe
 *         password:
 *           type: string
 *           description: User's password.
 *           example: strongPassword123
 *         email:
 *           type: string
 *           description: User's email address.
 *           example: john.doe@example.com
 *           format: email
 *       required:
 *         - login
 *         - password
 *         - email
 */
const userSchema = new mongoose.Schema<IUser>({
	login: { type: String, required: true },
	password: { type: String, required: true },
	email: {
		type: String,
		required: true,
		unique: true,
		match: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
	},
});

export const User = mongoose.model<IUser>('User', userSchema);
