import { Router } from 'express';
import { checkJwt } from '../middleware/authMiddleware';

import {
    getFunfactByUserName,
    addFunfact,
    updateFunfact,
    deleteFunfact,
  } from '../controller/funfactController';
  
  const router = Router();
  
  router.all('/*', (req, res, next) => {
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      checkJwt(req, res, next);
    } else {
      next();
    }
  });
  router.get('/:userid', getFunfactByUserName);
  router.route('/add').put(addFunfact);
  router.route('/update').put(updateFunfact);
  router.route('/delete').delete(deleteFunfact);
  
  export default router;