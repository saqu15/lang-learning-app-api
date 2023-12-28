import IWordset from '../interfaces/IWordset.js';
import { Word } from '../models/word.js';
import { Wordset } from '../models/wordset.js';
import { Request, Response, NextFunction } from 'express';

export const wordsets_get_all = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Wordset.find()
		.select('-__v')
		.populate('word', '-__v')
		.exec()
		.then(wordsets => {
			res.status(200).json({
				count: wordsets.length,
				wordsets: wordsets.map(wordset => {
					return {
						_id: wordset._id,
						word: wordset.word,
						elements: wordset.elements,
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
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Word.findById(req.body.wordId)
		.then(word => {
			if (!word) {
				throw new Error('Word not found');
			}
			const wordset = new Wordset<IWordset>({
				elements: req.body.elements,
				word: req.body.wordId,
			});

			return wordset.save();
		})
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Wordset stored',
				createdWordset: {
					_id: result._id,
					word: result.word,
					elements: result.elements,
				},
				request: {
					type: 'GET',
					url: process.env.APP_URL + '/wordsets/' + result._id,
				},
			});
		})
		.catch(err => {
			console.log(err);
			let statusCode = 500;
			let errorMessage = 'Internal Server Error';

			if (err.message === 'Word not found') {
				statusCode = 404;
				errorMessage = err.message;
			}

			res.status(statusCode).json({
				error: errorMessage,
			});
		});
};

export const wordsets_get_order = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Wordset.findById(req.params.wordsetId)
		.select('-__v')
		.populate('word', '-__v')
		.exec()
		.then(wordset => {
			if (!wordset) {
				throw new Error('Wordset not found');
			}
			res.status(200).json({
				wordset,
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
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
};
