import mongoose from 'mongoose';

interface IWord {
	nameFrom: string;
	nameTo: string;
	wordImage: string;
}

const wordSchema = new mongoose.Schema<IWord>({
	nameFrom: { type: String, required: true },
	nameTo: { type: String, required: true },
	wordImage: { type: String },
});

export const Word = mongoose.model<IWord>('Word', wordSchema);
