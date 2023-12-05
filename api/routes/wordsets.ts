import express from 'express';

export const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Wordsets were fetched',
	});
});

router.post('/', (req, res, next) => {
	const wordset = {
		wordId: req.body.wordId,
		langFrom: req.body.langFrom,
		langTo: req.body.langTo,
	};
	res.status(201).json({
		message: 'Wordset was created',
		wordset: wordset,
	});
});

router.get('/:wordsetId', (req, res, next) => {
	res.status(200).json({
		message: 'Wordset details',
		wordsetId: req.params.wordsetId,
	});
});

router.delete('/:wordsetId', (req, res, next) => {
	res.status(200).json({
		message: 'Wordset deleted',
		wordsetId: req.params.wordsetId,
	});
});
