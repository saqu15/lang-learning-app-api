import { Request } from 'express';
import jwt from 'jsonwebtoken';

export interface IAuthenticatedRequest extends Request {
	user?: string | jwt.JwtPayload;
}
