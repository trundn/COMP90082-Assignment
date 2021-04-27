import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user';

class Event {
  @prop({ required: true }) uuid!: string;
  @prop({ required: true }) eventName!: string;
  @prop({ required: true }) eventHoster!: string;
  @prop({ required: true }) eventLocation!: string;
  @prop({ required: true }) startDate!: Date;
  @prop({ required: true }) endDate!: Date;
}

class Events {
  @prop({ ref: User }) user: Ref<User>;
  @prop({ type: () => Event, _id: false }) events?: Event[];
}

const EventModel = getModelForClass(Events);

export { Event, EventModel };
