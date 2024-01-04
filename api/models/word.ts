import mongoose from 'mongoose';
import IWord from '../interfaces/IWord.js';

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Word:
//  *       type: object
//  *       properties:
//  *         nameFrom:
//  *           type: string
//  *           description: "Source name of the word."
//  *         nameTo:
//  *           type: string
//  *           description: "Target name of the word."
//  *         wordImage:
//  *           type: string
//  *           format: uri
//  *           description: "Path to the image associated with the word."
//  *       example:
//  *         nameFrom: "hello"
//  *         nameTo: "czesc"
//  *         wordImage: "/images/hello.jpg"
//  */
const wordSchema = new mongoose.Schema<IWord>({
	nameFrom: { type: String, required: true },
	nameTo: { type: String, required: true },
	wordImage: { type: String },
});

export const Word = mongoose.model<IWord>('Word', wordSchema);
