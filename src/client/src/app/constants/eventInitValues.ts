import { EventSectionTypes } from './eventConstant';
import { Event } from '@pure-and-lazy/api-interfaces';

export const defaultTypesValues: { [eventType: string]: boolean } = {
  [EventSectionTypes.Event]: false,
};

export const initialEventValues: Event = {
  eventName: '',
  eventHoster: '',
  eventLocation: '',
  startDate: new Date(),
  endDate: new Date(),
};
