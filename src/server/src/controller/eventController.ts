import { Request, response, Response } from 'express';
import * as mongoose from 'mongoose';
import { EventModel } from '../models/event';

const getEventByUserName = async (req: Request, res: Response) => {
  const { userid } = req.params;

  try {
    const item = await EventModel.findOne({
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

// const addEvent = async(req: Request, res: Response) =>{
//     const {event_id, new_qualification} = req.body;
//     try{
//
//     }
// }
