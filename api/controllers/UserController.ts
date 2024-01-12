import jwt, { Secret } from 'jsonwebtoken';
import IUser from '../interfaces/IUser.js';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { IAuthenticatedRequest } from '../interfaces/IAuthenticatedRequest.js';
import { IJwtPayload } from '../interfaces/IJwtPayload.js';
import { Schema } from 'mongoose';

export const user_signup = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: 'User with this email already exists',
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err,
						});
					} else {
						const user = new User<IUser>({
							login: req.body.login,
							password: hash,
							email: req.body.email,
						});

						user.save()
							.then(result => {
								console.log(result);
								res.status(201).json({
									message: 'User created',
								});
							})
							.catch(err => {
								console.log(err);
								res.status(500).json({
									error: err,
								});
							});
					}
				});
			}
		});
};

export const user_login = (req: Request, res: Response, next: NextFunction) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length < 1) {
				return res.status(401).json({
					message: 'Wrong login data',
				});
			}

			bcrypt.compare(
				req.body.password,
				user[0].password,
				(err, result) => {
					if (err) {
						return res.status(401).json({
							message: 'Wrong login data',
						});
					}
					if (result) {
						const token = jwt.sign(
							{
								email: user[0].email,
								userId: user[0]._id,
							},
							process.env.JWT_KEY as Secret,
							{ expiresIn: '4h' }
						);
						return res.status(200).json({
							message: 'Auth successful',
							token,
						});
					}

					return res.status(401).json({
						message: 'Wrong login data',
					});
				}
			);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

export const user_delete_user = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	User.deleteOne({ _id: req.params.userId })
		.exec()
		.then(result => {
			console.log(result);
			if (result.deletedCount >= 1) {
				res.status(200).json({
					message: 'User deleted',
				});
			} else {
				res.status(404).json({
					message: 'User not found',
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

export const user_get_user = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	getUserById(req.params.userId, res);
};

export const user_get_current_user = (
	req: IAuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as IJwtPayload;

	getUserById(user.userId, res);
};

function getUserById(
	userId: string | Schema.Types.ObjectId,
	res: Response
): void {
	User.findById(userId)
		.exec()
		.then(result => {
			if (!result) {
				throw new Error('User not found');
			}
			res.status(200).json({
				id: result._id,
				login: result.login,
			});
		})
		.catch(err => {
			let statusCode = 500;
			let errorMessage = 'Internal Server Error';

			if (err.message === 'User not found') {
				statusCode = 404;
				errorMessage = err.message;
			}

			res.status(statusCode).json({
				error: errorMessage,
			});
		});
}
