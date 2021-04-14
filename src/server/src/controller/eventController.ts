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

  console.log('event', event);
  console.log('user', user);
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
  const { event_id, new_event } = req.body;

  try {
    try {
      await EventModel.findOneAndUpdate(
        {
          // 可能不是event_id而是user_id
          _id: mongoose.Types.ObjectId(event_id),
          eventRef: { $elemMatch: { uuid: new_event.uuid } },
        },
        {
          $set: {
            'eventRef.$.eventName': new_event.eventName,
            'eventRef.$.eventHoster': new_event.eventHoster,
            'eventRef.$.eventLocation': new_event.eventLocation,
            'eventRef.$.startDate': new_event.startDate,
            'eventRef.$.endDate': new_event.endDate,
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
