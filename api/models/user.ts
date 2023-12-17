import mongoose from 'mongoose';

export interface IUser {
	login: String;
	password: String;
	email: String;
}

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
