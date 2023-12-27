import express from 'express';
import checkAuth from '../middleware/check-auth.js';
import * as WordsetController from '../controllers/wordsets.js';

export const router = express.Router();

router.get('/', checkAuth, WordsetController.wordsets_get_all);

router.post('/', checkAuth, WordsetController.wordsets_create_wordset);

router.get('/:wordsetId', checkAuth, WordsetController.wordsets_get_order);

router.delete('/:wordsetId', checkAuth, WordsetController.wordsets_delete_wordset);
