import { Router } from 'express';
import { checkJwt } from '../middleware/authMiddleware';
import {
  createAcademic,
  getAcademicByUserName,
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

export default router;
