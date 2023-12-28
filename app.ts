import express, { Request, Response } from 'express';
import { router as wordsRoute } from './api/routes/words.js';
import { router as wordsetsRoute } from './api/routes/wordsets.js';
import { router as userRoute } from './api/routes/user.js';
import log from 'morgan';
import mongoose from 'mongoose';
import { ResponseError } from './api/utils/response-error.js';
import swaggerDocs from './api/utils/swagger.js';

export const app = express();

mongoose
	.connect(
		'mongodb+srv://szymon-node:' +
			process.env.MONGO_ATLAS_PW +
			'@lang-learning-app.u16btri.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('db connected');
	})
	.catch(console.log);

app.use(log('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.use('/api/words', wordsRoute);
app.use('/api/wordsets', wordsetsRoute);
app.use('/api/user', userRoute);

app.use((req: Request, res: Response, next: any) => {
	if (req.path.startsWith('/docs')) {
		return next();
	}
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
