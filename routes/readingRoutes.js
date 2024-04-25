import { Router } from 'express';
const router = Router();

import {
  getAllReadings,
  newReading,
  singleReading,
} from '../controllers/readingController.js';

router.get('/',getAllReadings);
// router.post('/', newReading);

router.route('/').get(getAllReadings).post(newReading);
router.route('/:id').get(singleReading);

export default router;