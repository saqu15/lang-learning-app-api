import mongoose from 'mongoose';
import IWord from './IWord.js';

// export default interface IWordset {
// 	word: mongoose.Schema.Types.ObjectId;
// 	elements: number;
// }

export default interface IWordset {
	userId: mongoose.Schema.Types.ObjectId;
	wordsetName: string;
	languageFrom: string;
	languageTo: string;
	words: IWord[];
}
