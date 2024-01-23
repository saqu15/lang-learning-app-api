import { Response, NextFunction } from 'express';
import { IAuthenticatedRequest } from '../interfaces/IAuthenticatedRequest.js';
import { WordsetHistory } from '../models/wordsetHistory.js';
import IWordsetHistory from '../interfaces/IWordsetHistory.js';
import { IJwtPayload } from '../interfaces/IJwtPayload.js';

export const wordset_history_add_wordset_to_history = (
	req: IAuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as IJwtPayload;

	const wordsetHistory = new WordsetHistory<IWordsetHistory>({
		userId: user.userId,
		wordsetId: req.body.wordset.id,
		languageFrom: req.body.wordset.languageFrom,
		languageTo: req.body.wordset.languageTo,
		finishDate: req.body.finishDate,
		timeElapsed: req.body.timeElapsed,
		fails: req.body.fails,
	});

	wordsetHistory
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Wordset history saved',
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

export const wordset_history_get_user_wordset_history = (
	req: IAuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as IJwtPayload;

	WordsetHistory.find({
		userId: user.userId,
		wordsetId: req.params.wordsetId,
	})
		.limit(10)
		.exec()
		.then(result => {
			res.status(200).json(
				result.map(history => {
					return {
						id: history._id,
						userId: history.userId,
						wordsetId: history.wordsetId,
						finishDate: history.finishDate,
						timeElapsed: history.timeElapsed,
						fails: history.fails,
						languageFrom: history.languageFrom,
						languageTo: history.languageTo,
					};
				})
			);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
