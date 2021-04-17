import { Request, Response } from 'express';
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
        console.error;
      }
    };
    
    const updateFunfact = async (req: Request, res: Response) => {
      const { user, funfact} = req.body;
      try {
        try {
          await FunfactModel.findOneAndUpdate(
            {
              user: mongoose.Types.ObjectId(user),
              funfacts: { $elemMatch: { uuid: funfact.uuid } },
            },
            {
              $set: {
                'funfacts.$.factName': funfact.factName,
                'funfacts.$.factDetail': funfact.factDetail,
              },
            }
          );
          res.sendStatus(201);
        } catch {
          res.sendStatus(404);
        }
      } catch {
        res.sendStatus(400);
      }
    };
    
    const deleteFunfact = async (req: Request, res: Response) => {
      const { user, funfactUUID } = req.body;
      try {
        try {
          await FunfactModel.findOneAndUpdate(
            {
              user: mongoose.Types.ObjectId(user),
            },
            {
              $pull: {
                funfacts: {uuid: funfactUUID},
              },
            }
          );
          res.sendStatus(201);
        } catch {
          res.sendStatus(404);
        }
      } catch {
        res.sendStatus(400);
      }
};

export { addFunfact, updateFunfact, deleteFunfact,getFunfactByUserName };