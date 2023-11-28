import express from 'express';
import { router as wordsRoute } from './api/routes/words.js';
import { router as wordsetsRoute } from './api/routes/wordsets.js';

export const app = express();

app.use('/words', wordsRoute);
app.use('/wordsets', wordsetsRoute);
