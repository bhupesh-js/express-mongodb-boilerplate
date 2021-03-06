import { Router } from 'express';
import { authenticationHandler } from '../middleware/authentication';
import { responseFormatHandler } from '../middleware/responseFormat';
import * as BookController from '../controllers/book';

const router = Router();

// Book routes
router.post('/add', authenticationHandler, BookController.add, responseFormatHandler);
router.get('/all', authenticationHandler, BookController.all, responseFormatHandler);
router.get('/search', authenticationHandler, BookController.search, responseFormatHandler);

export default router;
