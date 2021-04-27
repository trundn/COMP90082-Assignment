import moment from 'moment';

import {
  DB_DATE_FORMAT,
  DISPLAY_DATE_FORMAT,
  DATE_DISPLAY_UNKNOWN,
  DATE_DISPLAY_PRESENT,
  DATE_NO_EXPIRATION_DATE,
} from '../constants/dateConstant';

const toDisplayDate = (date: Date, defaultVal: string): string => {
  return date
    ? moment(date, DB_DATE_FORMAT).format(DISPLAY_DATE_FORMAT)
    : defaultVal;
};

const getCertificateDuration = (startDate: Date, endDate: Date): string => {
  const duration = toDisplayDate(startDate, DATE_DISPLAY_UNKNOWN);
  return `${duration} ~ ${toDisplayDate(endDate, DATE_NO_EXPIRATION_DATE)}`;
};

const getDuration = (startDate: Date, endDate: Date): string => {
  const duration = toDisplayDate(startDate, DATE_DISPLAY_UNKNOWN);
  return `${duration} ~ ${toDisplayDate(endDate, DATE_DISPLAY_PRESENT)}`;
};

export { toDisplayDate, getDuration, getCertificateDuration };
