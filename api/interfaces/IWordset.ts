import mongoose from 'mongoose';
import IWord from './IWord.js';

export default interface IWordset {
	userId?: mongoose.Schema.Types.ObjectId;
	wordsetName: string;
	languageFrom: string;
	languageTo: string;
	words: IWord[];
	userName?: string;
	ownerId?: mongoose.Schema.Types.ObjectId;
	description?: string;
}
