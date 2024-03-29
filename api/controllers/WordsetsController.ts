import { IAuthenticatedRequest } from '../interfaces/IAuthenticatedRequest.js';
import { IJwtPayload } from '../interfaces/IJwtPayload.js';
import IWordset from '../interfaces/IWordset.js';
import { Wordset } from '../models/wordset.js';
import { Request, Response, NextFunction } from 'express';
import IWord from '../interfaces/IWord.js';

export const wordsets_get_all = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Wordset.find()
		.select('-__v')
		.populate('userId', 'login')
		.exec()
		.then(wordsets => {
			res.status(200).json({
				count: wordsets.length,
				wordsets: wordsets.map(wordset => {
					const user = wordset.userId as any;
					return {
						id: wordset._id,
						userId: user?._id,
						userName: user?.login,
						languageFrom: wordset.languageFrom,
						languageTo: wordset.languageTo,
						wordsetName: wordset.wordsetName,
						words: wordset.words,
						description: wordset?.description,
						request: {
							type: 'GET',
							url:
								process.env.APP_URL +
								'/wordsets/' +
								wordset._id,
						},
					};
				}),
			});
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
};

export const wordsets_create_wordset = (
	req: IAuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as IJwtPayload;

	const wordset = new Wordset<IWordset>({
		userId: user.userId,
		wordsetName: req.body.wordsetName,
		languageFrom: req.body.languageFrom,
		languageTo: req.body.languageTo,
		words: req.body.words,
		description: req.body?.description,
	});

	wordset
		.save()
		.then(result => {
			res.status(201).json({
				createdWordset: {
					wordsetName: wordset.wordsetName,
					languageFrom: wordset.languageFrom,
					languageTo: wordset.languageTo,
					words: wordset.words,
					id: wordset._id,
					description: wordset?.description,
					request: {
						type: 'GET',
						url: process.env.APP_URL + '/wordsets/' + wordset._id,
					},
				},
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

export const wordsets_get_wordset = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Wordset.findById(req.params.wordsetId)
		.select('-__v')
		.populate('userId', 'login')
		.exec()
		.then(wordset => {
			if (!wordset) {
				throw new Error('Wordset not found');
			}

			const user = wordset.userId as any;

			res.status(200).json({
				wordsets: {
					id: wordset._id,
					userId: user?._id,
					userName: user?.login,
					wordsetName: wordset.wordsetName,
					languageFrom: wordset.languageFrom,
					languageTo: wordset.languageTo,
					words: wordset.words,
					description: wordset?.description,
				},
				request: {
					type: 'GET',
					url: process.env.APP_URL + '/wordsets',
				},
			});
		})
		.catch(err => {
			let statusCode = 500;
			let errorMessage = 'Internal Server Error';

			if (err.message === 'Wordset not found') {
				statusCode = 404;
				errorMessage = err.message;
			}

			res.status(statusCode).json({
				error: errorMessage,
			});
		});
};

export const wordsets_delete_wordset = (
	req: IAuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	Wordset.findById(req.params.wordsetId)
		.exec()
		.then(wordset => {
			if ((req.user as IJwtPayload).userId.toString() !== wordset?.userId?.toString()) {
				res.status(401).json({ message: 'Unauthorized' });
				return;
			} else {
				Wordset.deleteOne({ _id: req.params.wordsetId })
					.exec()
					.then(wordset => {
						res.status(200).json({
							message: 'Wordset deleted',
							request: {
								type: 'POST',
								url: process.env.APP_URL + '/wordsets',
								body: {
									wordId: 'ID',
									elements: 'Number',
								},
							},
						});
					});
			}
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
};

export const wordsets_update_wordset = (
	req: IAuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	if ((req.user as IJwtPayload).userId !== req.body.userId) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	const updatedWordset: IWordset = {
		wordsetName: req.body.wordsetName,
		languageFrom: req.body.languageFrom,
		languageTo: req.body.languageTo,
		words: req.body.words.map((word: IWord) => {
			return {
				nameFrom: word.nameFrom,
				nameTo: word.nameTo,
			} as IWord;
		}),
	};

	Wordset.updateOne({ _id: req.params.wordsetId }, { $set: updatedWordset })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Wordset updated',
				request: {
					type: 'GET',
					ulr: process.env.APP_URL + '/wordsets' + req.params.id,
				},
			});
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
};
