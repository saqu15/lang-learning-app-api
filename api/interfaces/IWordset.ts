import mongoose from "mongoose";

export default interface IWordset {
	word: mongoose.Schema.Types.ObjectId;
	elements: Number;
}