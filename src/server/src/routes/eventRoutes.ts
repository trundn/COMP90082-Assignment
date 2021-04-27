import { Router } from 'express';
import { checkJwt } from '../middleware/authMiddleware';
import {
  getEventByUserName,
  addEvent,
  updateEvent,
  deleteEvent,
} from '../controller/eventController';

const router = Router();

router.all('/*', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    checkJwt(req, res, next);
  } else {
    next();
  }
});
// Get event data from database
router.get('/:userid', getEventByUserName);
router.route('/add').put(addEvent);
router.route('/update').put(updateEvent);
router.route('/delete').delete(deleteEvent);

export default router;
