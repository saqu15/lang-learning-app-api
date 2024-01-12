import mongoose from 'mongoose';

export default interface IUserWordset {
	userId: mongoose.Schema.Types.ObjectId;
	wordsetId: mongoose.Schema.Types.ObjectId;
}
