import { Router } from 'express';
import authRouter from './auth.js';
import nannysRouter from '../routes/nannys.js';
import reviewsRouter from '../routes/reviews.js';
const router = Router();

router.use('/auth', authRouter);
router.use('/nannys', nannysRouter);
router.use('/reviews', reviewsRouter);

export default router;
