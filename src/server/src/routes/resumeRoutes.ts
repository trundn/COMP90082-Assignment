import { Router } from 'express';
import { checkJwt } from '../middleware/authMiddleware';
import {
  getResumeByUserName,
  addQualification,
  updateQualification,
  deleteQualification,
} from '../controller/resumeController';

const router = Router();

router.all('/*', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    checkJwt(req, res, next);
  } else {
    next();
  }
});

router.get('/:userid', getResumeByUserName);

router.route('/qualifications/add').put(addQualification);
router.route('/qualifications/update').put(updateQualification);
router.route('/qualifications/delete').delete(deleteQualification);

export default router;
