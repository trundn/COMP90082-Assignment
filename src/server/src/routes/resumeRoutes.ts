import { Router } from 'express';
import { checkJwt } from '../middleware/authMiddleware';
import {
  getResumeByUserName,
  addQualification,
  updateQualification,
  deleteQualification,
  addAward,
  updateAward,
  deleteAward,
  addCertificate,
  updateCertificate,
  deleteCertificate,
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

router.route('/awards/add').put(addAward);
router.route('/awards/update').put(updateAward);
router.route('/awards/delete').delete(deleteAward);

router.route('/certificates/add').put(addCertificate);
router.route('/certificates/update').put(updateCertificate);
router.route('/certificates/delete').delete(deleteCertificate);

export default router;
