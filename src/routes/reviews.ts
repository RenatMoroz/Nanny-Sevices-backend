import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as controllers from '../controllers/reviewsController.js';

const router = Router();

router.get('/', ctrlWrapper(controllers.getAllReviews));
router.get('/nanny/:nannyId', ctrlWrapper(controllers.getReviewsByNannyId));
router.get('/:reviewId', ctrlWrapper(controllers.getReviewById));
router.post(
  '/nanny/:nannyId',
  ctrlWrapper(controllers.createReviewsForNanny),
);
router.patch('/:reviewId', ctrlWrapper(controllers.updateReviewById));
router.delete('/:reviewId', ctrlWrapper(controllers.deleteReviewById));

export default router;
