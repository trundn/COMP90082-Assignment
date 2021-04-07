import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { ResumeModel } from '../models/resume';

const getResumeByUserName = async (req: Request, res: Response) => {
  const { userid } = req.params;

  try {
    const item = await ResumeModel.findOne({
      user: mongoose.Types.ObjectId(userid),
    });
    if (item) {
      res.send(item);
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
};

export { getResumeByUserName };
