import { Event } from '@pure-and-lazy/api-interfaces';

export const initialValues: Event = {
  eventName: '',
  eventHoster: '',
  eventLocation: '',
  startDate: new Date(),
  endDate: new Date(),
};
