import jwt, { Secret } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interfaces/IAuthenticatedRequest.js';

export default (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		console.log(token);
		const decoded = jwt.verify(
			token as string,
			process.env.JWT_KEY as Secret
		);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Auth failed',
		});
	}
};
