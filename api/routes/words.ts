import express from 'express';
import { Word } from '../models/word.js';
import mongoose from 'mongoose';

export const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Words
 *  description: Words section
 */

/**
 * @swagger
 * /words:
 *   get:
 *     summary: Pobierz listę wszystkich słów
 *     description: Endpoint służy do pobierania listy wszystkich dostępnych słów.
 *     tags:
 *       - Words
 *     responses:
 *       '200':
 *         description: Sukces
 *         content:
 *           application/json:
 *             example:
 *               words:
 *                 - hello
 *                 - world
 *       '500':
 *         description: Błąd serwera
 *         content:
 *           application/json:
 *             example:
 *               error: Wystąpił błąd podczas pobierania danych
 */
router.get('/', (req, res, next) => {
	Word.find()
		.select('-__v')
		.exec()
		.then(words => {
			const response = {
				count: words.length,
				words: words.map(word => {
					return {
						nameFrom: word.nameFrom,
						nameTo: word.nameTo,
						_id: word._id,
						request: {
							type: 'GET',
							url: process.env.APP_URL + '/words/' + word._id,
						},
					};
				}),
			};

			console.log(response);
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.post('/', (req, res, next) => {
	console.log(req.body.nameFrom, req.body.nameTo, req.body);
	const word = new Word({
		nameFrom: req.body.nameFrom,
		nameTo: req.body.nameTo,
	});

	word.save()
		.then(result => {
			res.status(201).json({
				message: 'handling POST request to /words',
				createdWord: {
					nameFrom: word.nameFrom,
					nameTo: word.nameTo,
					_id: word._id,
					request: {
						type: 'GET',
						url: process.env.APP_URL + '/words/' + word._id,
					},
				},
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

/**
 * @swagger
 * /words/{id}:
 *  get:
 *   summary: Get the word by id
 *   tags: [Words]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: Word id
 *   responses:
 *    200:
 *     description: The word by id
 */
router.get('/:wordId', (req, res, next) => {
	const id = req.params.wordId;
	Word.findById(id)
		.select('-__v')
		.exec()
		.then(word => {
			console.log(word);
			if (word) {
				res.status(200).json({
					word,
					request: {
						type: 'GET',
						description: 'Get all words',
						url: process.env.APP_URL + '/words',
					},
				});
			} else {
				res.status(404).json({ message: 'Not found ' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.patch('/:wordId', (req, res, next) => {
	const id = req.params.wordId;

	Word.findByIdAndUpdate(id, { $set: req.body }, { new: true })
		.then(result =>
			res.status(200).json({
				message: 'Word updated',
				request: {
					type: 'GET',
					url: process.env.APP_URL + '/words/' + id,
				},
			})
		)
		.catch(err => res.status(500).json({ error: err }));
});

router.delete('/:wordId', (req, res, next) => {
	const id = req.params.wordId;
	Word.deleteOne({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Word deleted',
				request: {
					type: 'POST',
					url: process.env.APP_URL + '/words',
					body: { nameFrom: 'string', nameTo: 'string' },
				},
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});
