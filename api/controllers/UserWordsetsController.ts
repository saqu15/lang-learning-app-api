import { Request, Response, NextFunction } from 'express';
import { UserWordset } from '../models/userWordset.js';
import IUserWordset from '../interfaces/IUserWordset.js';
import { IAuthenticatedRequest } from '../interfaces/IAuthenticatedRequest.js';
import { IJwtPayload } from '../interfaces/IJwtPayload.js';

export const user_wordsets_add_wordset_to_user = (
	req: IAuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as IJwtPayload;

	UserWordset.find({ userId: user.userId, wordsetId: req.body.wordsetId })
		.exec()
		.then(userWordset => {
			if (userWordset.length >= 1) {
				return res.status(409).json({
					message: 'Wordset is already added to user collection',
				});
			} else {
				const userWordset = new UserWordset<IUserWordset>({
					userId: user.userId,
					wordsetId: req.body.wordsetId,
				});

				userWordset
					.save()
					.then(result => {
						console.log(result);
						res.status(201).json({
							message: 'Wordset added to user',
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
};

export const user_wordsets_get_user_wordsets = (
	req: IAuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as IJwtPayload;

	UserWordset.find({ userId: user.userId })
        .populate('wordsetId', '-__v')
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json({ 
                wordset: result.map((userWordset) => {
                    const wordset = userWordset.wordsetId as any;
                    return {
                        id: wordset._id,
                        userId: wordset.userId,
                        userName: wordset.userName,
                        wordsetName: wordset.wordsetName,
                        languageFrom: wordset.languageFrom,
                        languageTo: wordset.languageTo,
                        words: wordset.words
                    }
                }) 
             });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
