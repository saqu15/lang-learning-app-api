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
		.exec()
		.then(words => {
			console.log(words);
			res.status(200).json(words);
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

	console.log(word);

	word.save()
		.then(result => {
			console.log(result);
		})
		.catch(err => console.log(err));

	res.status(201).json({
		message: 'handling POST request to /words',
		createdWord: word,
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
		.exec()
		.then(word => {
			console.log(word);
			if (word) {
				res.status(200).json({ word });
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
		.then(result => res.status(200).json(result))
		.catch(err => res.status(500).json({ error: err }));
});

router.delete('/:wordId', (req, res, next) => {
	const id = req.params.wordId;
	Word.deleteOne({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});
