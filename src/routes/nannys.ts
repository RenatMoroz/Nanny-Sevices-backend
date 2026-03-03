import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as controllers from '../controllers/nannysController.js';

const router = Router();
router.get('/', ctrlWrapper(controllers.getAllNannys));
router.get('/:nannyId', ctrlWrapper(controllers.getNannyById));
router.post('/', ctrlWrapper(controllers.createNanny));
router.patch('/:nannyId', ctrlWrapper(controllers.updateNannyById));
router.delete('/:nannyId', ctrlWrapper(controllers.deleteNannyById));
export default router;
