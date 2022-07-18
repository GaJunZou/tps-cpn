import { dateFormat } from '@/utils/util';
const tpsEmpty = (value) => {
  return value !== null && value !== undefined && value !== '' ? String(value) : '--';
};

const tpsDateFormat = (value, format = 'yyyy-MM-dd hh:mm:ss') => {
  let dateStr = '';
  if (value instanceof Date) {
    dateStr = dateFormat(value, format);
  } else {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      dateStr = value;
    } else {
      dateStr = dateFormat(date, format);
    }
  }
  return dateStr;
};

export const FILTER = { tpsEmpty, tpsDateFormat };
