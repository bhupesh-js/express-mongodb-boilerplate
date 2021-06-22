import { Router } from 'express';

import * as UserController from '../controllers/user';
import { authenticationHandler } from '../middleware/authentication';
import { responseFormatHandler } from '../middleware/responseFormat';

const router = Router();

// User routes
router.post('/login', UserController.login, responseFormatHandler);
router.post('/register', UserController.register, responseFormatHandler);
router.patch('/update', authenticationHandler, UserController.update, responseFormatHandler);

export default router;
