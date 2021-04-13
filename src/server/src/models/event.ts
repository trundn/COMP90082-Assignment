import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user';

class Event {
  @prop({ required: true }) eventName?: string;
  @prop({ required: true }) eventHoster?: string;
  @prop({ required: true }) eventLocation?: string;
  @prop({ required: true }) startDate?: Date;
  @prop({ required: true }) endDate?: Date;
}

const EventModel = getModelForClass(Event);

export { Event, EventModel };
