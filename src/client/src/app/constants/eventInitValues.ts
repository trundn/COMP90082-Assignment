import { Event } from '@pure-and-lazy/api-interfaces';

export const initialEventValues: Event = {
  eventName: '',
  eventHoster: '',
  eventLocation: '',
  startDate: new Date(),
  endDate: new Date(),
};
