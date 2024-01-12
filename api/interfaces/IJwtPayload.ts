import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export interface IJwtPayload extends jwt.JwtPayload {
	userId: mongoose.Schema.Types.ObjectId;
	email: string;
}
