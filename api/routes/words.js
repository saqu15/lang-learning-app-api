import express from 'express';

export const router = express.Router();

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
