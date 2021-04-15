import { Request, response, Response } from 'express';
import * as mongoose from 'mongoose';
import { FunfactModel } from '../models/funfact';

const getFunfactByUserName = async (req: Request, res: Response) => {
  const { userid } = req.params;

  try {
    const item = await FunfactModel.findOne({
      user: mongoose.Types.ObjectId(userid),
    });
    if (item) {
      res.send(item);
    } else {
        const newFunfact = await FunfactModel.create({
            user: mongoose.Types.ObjectId(userid),
          });
          if (newFunfact) {
            res.send(newFunfact);
          } else {
            res.sendStatus(404);
          }
        }
      } catch {
        res.sendStatus(400);
      }
    };
    
    const addFunfact = async (req: Request, res: Response) => {
      const { user, funfact } = req.body;

      console.log('funfact', funfact);
      console.log('user', user);
    
      try {
        const item = await FunfactModel.findOne({
            user: mongoose.Types.ObjectId(user),
          });
          if (!item) {
            await FunfactModel.create({
              user: mongoose.Types.ObjectId(user),
              funfacts: [],
            });
        }
        await FunfactModel.findOneAndUpdate(
          { user: mongoose.Types.ObjectId(user) },
          { $push: { funfacts: funfact } }
        );
        res.send(item);
      } catch {
        res.sendStatus(400);
      }
    };
    
    const updateFunfact = async (req: Request, res: Response) => {
      const { funfact_id, new_funfact } = req.body;

    };
    
    const deleteFunfact = async (req: Request, res: Response) => {
      const { funfact_id, event_uuid } = req.body;
    
};

export { addFunfact, updateFunfact, deleteFunfact,getFunfactByUserName };