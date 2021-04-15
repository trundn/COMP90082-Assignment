import { Request, response, Response } from 'express';
import * as mongoose from 'mongoose';
import { EventModel } from '../models/event';

const getEventByUserName = async (req: Request, res: Response) => {
  const { userid } = req.params;
  console.log('userid', userid);
  try {
    const item = await EventModel.findOne({
      user: mongoose.Types.ObjectId(userid),
    });
    if (item) {
      res.send(item);
    } else {
      const newEvent = await EventModel.create({
        user: mongoose.Types.ObjectId(userid),
      });
      if (newEvent) {
        res.send(newEvent);
      } else {
        res.sendStatus(404);
      }
    }
  } catch {
    res.sendStatus(400);
  }
};

// Create new event
const addEvent = async (req: Request, res: Response) => {
  const { user, event } = req.body;

  // console.log('event', event);
  // console.log('user', user);
  try {
    const item = await EventModel.findOne({
      user: mongoose.Types.ObjectId(user),
    });
    if (!item) {
      await EventModel.create({
        user: mongoose.Types.ObjectId(user),
        events: [],
      });
    }
    await EventModel.findOneAndUpdate(
      { user: mongoose.Types.ObjectId(user) },
      { $push: { events: event } }
    );
    res.send(item);
  } catch {
    console.error;
  }
};

// update event
const updateEvent = async (req: Request, res: Response) => {
  const { user, event } = req.body;
  console.log('event', event);
  // console.log("user", user);
  try {
    try {
      await EventModel.findOneAndUpdate(
        {
          // 可能不是event_id而是user_id
          user: mongoose.Types.ObjectId(user),
          events: { $elemMatch: { uuid: event.uuid } },
        },
        {
          $set: {
            'events.$.eventName': event.eventName,
            'events.$.eventHoster': event.eventHoster,
            'events.$.eventLocation': event.eventLocation,
            'events.$.startDate': event.startDate,
            'events.$.endDate': event.endDate,
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

// delete event
const deleteEvent = async (req: Request, res: Response) => {
  const { event_id, event_uuid } = req.body;

  try {
    try {
      await EventModel.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(event_id),
        },
        {
          $pull: {
            // Should implement later
            // eventRef: { uuid: event_uuid },
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

export { addEvent, updateEvent, deleteEvent, getEventByUserName };
