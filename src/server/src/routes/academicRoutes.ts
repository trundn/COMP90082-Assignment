import { Router } from 'express';
import { checkJwt } from '../middleware/authMiddleware';
import {
  createAcademic,
  getAcademicByUserName,
  updateAcademic,
  deleteAcademic,
} from '../controller/academicController';

const router = Router();

router.all('/*', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    checkJwt(req, res, next);
  } else {
    next();
  }
});

router.get('/:userid', getAcademicByUserName);

router.route('/add_academic').put(createAcademic);
router.route('/update_academic').put(updateAcademic);
router.route('/delete_academic').put(deleteAcademic);

export default router;
