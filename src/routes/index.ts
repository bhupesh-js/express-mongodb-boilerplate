import { Router } from 'express';
import user from './user';
import book from './book';

const router = Router();
router.use('/account', user);
router.use('/book', book);

export default router;
