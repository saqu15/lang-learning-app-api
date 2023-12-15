import mongoose from 'mongoose';

interface IWordset {
	word: mongoose.Schema.Types.ObjectId;
	elements: Number;
}

const wordsetSchema = new mongoose.Schema<IWordset>({
	word: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },
	elements: { type: Number, default: 1 },
});

export const Wordset = mongoose.model<IWordset>('Wordset', wordsetSchema);
