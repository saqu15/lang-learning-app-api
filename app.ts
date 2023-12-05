import express, { Request, Response } from 'express';
import { router as wordsRoute } from './api/routes/words.js';
import { router as wordsetsRoute } from './api/routes/wordsets.js';
import log from 'morgan';
import bodyParser from 'body-parser';

export const app = express();

interface ResponseError extends Error {
	status?: number;
}

app.use(log('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: any) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}

	next();
});

app.use('/words', wordsRoute);
app.use('/wordsets', wordsetsRoute);

app.use((req: Request, res: Response, next: any) => {
	const error: ResponseError = {
		message: 'Not found',
		name: 'Not found',
		status: 404,
	};
	next(error);
});

app.use((error: ResponseError, req: Request, res: Response, next: any) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});
