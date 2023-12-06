import mongoose from 'mongoose';

interface IWord {
	nameFrom: string;
	nameTo: string;
}

const wordSchema = new mongoose.Schema<IWord>({
	nameFrom: { type: String, required: true },
	nameTo: { type: String, required: true },
});

export const Word = mongoose.model<IWord>('Word', wordSchema);
