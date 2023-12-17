import mongoose from 'mongoose';
import IWord from '../interfaces/IWord.js';

const wordSchema = new mongoose.Schema<IWord>({
	nameFrom: { type: String, required: true },
	nameTo: { type: String, required: true },
	wordImage: { type: String },
});

export const Word = mongoose.model<IWord>('Word', wordSchema);
