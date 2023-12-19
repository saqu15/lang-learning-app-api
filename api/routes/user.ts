import express from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser.js';
import jwt, { Secret } from 'jsonwebtoken';

export const router = express.Router();

router.post('/signup', (req, res, next) => {
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
});

router.post('/login', (req, res, next) => {
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
							{ expiresIn: '1h' }
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
});

router.delete('/:userId', (req, res, next) => {
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
});
