import mongoose, { Date } from 'mongoose';

export default interface IWordsetHistory {
	id?: mongoose.Schema.Types.ObjectId;
	userId: mongoose.Schema.Types.ObjectId;
	wordsetId: mongoose.Schema.Types.ObjectId;
	finishDate: Date;
	timeElapsed: number;
	fails: number;
	languageFrom: string;
	languageTo: string;
}
