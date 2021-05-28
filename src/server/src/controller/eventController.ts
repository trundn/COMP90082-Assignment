
import { Request, response, Response } from 'express';
import * as mongoose from 'mongoose';
import { EventModel } from '../models/event';
import {Res} from '../utils/controllerUtil';

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
const addEvent = async (req: Request, res: Res<Event>) => {
  const { user, event } = req.body;
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
    res.sendStatus(201);
  } catch {
    console.error;
  }
};

// update event
const updateEvent = async (req: Request, res: Res<Event>) => {
  const { user, event } = req.body;
  try {
    try {
      await EventModel.findOneAndUpdate(
        {
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
const deleteEvent = async (req: Request, res: Res<Event>) => {
  const { user, eventUUID } = req.body;
  // console.log('delete', eventUUID);
  try {
    try {
      await EventModel.findOneAndUpdate(
        {
          user: mongoose.Types.ObjectId(user),
        },
        {
          $pull: {
            events: { uuid: eventUUID },
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
