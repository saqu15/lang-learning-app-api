import express from 'express';
import { Word } from '../models/word.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import IWord from '../interfaces/IWord.js';
import checkAuth from '../middleware/check-auth.js';

export const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + file.originalname);
	},
});

const fileFilter = (
	req: Express.Request,
	file: Express.Multer.File,
	cb: any
) => {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
		cb(null, true);
	} else {
		// reject file
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter,
});

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
						wordImage: word.wordImage,
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

router.post('/', checkAuth, upload.single('wordImage'), (req, res, next) => {
	console.log(req.file);
	const word = new Word<IWord>({
		nameFrom: req.body.nameFrom,
		nameTo: req.body.nameTo,
		wordImage: req.file ? req.file.path : '',
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

router.patch('/:wordId', checkAuth, (req, res, next) => {
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

router.delete('/:wordId', checkAuth, (req, res, next) => {
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
