import moment from 'moment';

import {
  DB_DATE_FORMAT,
  DISPLAY_DATE_FORMAT,
  DATE_DISPLAY_UNKNOWN,
  DATE_DISPLAY_PRESENT,
} from '../constants/dateConstant';

const toDisplayDate = (date: Date, defaultVal: string): string => {
  return date
    ? moment(date, DB_DATE_FORMAT).format(DISPLAY_DATE_FORMAT)
    : defaultVal;
};

const getDuration = (startDate: Date, endDate: Date): string => {
  const duration = toDisplayDate(startDate, DATE_DISPLAY_UNKNOWN);
  return `${duration} - ${toDisplayDate(endDate, DATE_DISPLAY_PRESENT)}`;
};

export { DB_DATE_FORMAT, DISPLAY_DATE_FORMAT, toDisplayDate, getDuration };
