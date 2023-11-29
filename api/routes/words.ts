import express from 'express';

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
	res.status(200).json({
		message: 'handling GET request to /words',
	});
});

router.post('/', (req, res, next) => {
	res.status(201).json({
		message: 'handling POST request to /words',
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
	if (id === '999') {
		res.status(200).json({
			message: 'word id 999',
		});
	} else {
		res.status(200).json({
			message: 'id passed',
		});
	}
});

router.patch('/:wordId', (req, res, next) => {
	res.status(200).json({
		message: 'updated word',
	});
});

router.delete('/:wordId', (req, res, next) => {
	res.status(200).json({
		message: 'deleted word',
	});
});
