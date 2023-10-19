import { Event } from './types';

const stringToDate = (string: string, startDate?: Date): Date | null => {
  /* if string is not null
  make 25.12. -> 2023/12/25 (date) */

  const date = string
    ? new Date(
        string
          .split('.')
          .concat(new Date().getFullYear().toString())
          .reverse()
          .join('/')
      )
    : null;

  /* if date is not null and smaller than today
  add one year to the date (2023->2024) */
  if (date && date < new Date()) date.setFullYear(date.getFullYear() + 1);

  /* if startDate and date are not null and date is smaller or same as startDate
  add one year to date (based on start date)
  (startDate 2024 -> date 2025) */
  if (startDate && date && date <= startDate)
    date.setFullYear(startDate.getFullYear() + 1);

  return date;
};
const addTimeToDate = (
  time: string,
  startDate: Date,
  endDate?: Date
): Date | null => {
  const hoursMinutes = time ? time.split('.') : null;
  const timed = hoursMinutes
    ? new Date(
        endDate
          ? endDate.setHours(Number(hoursMinutes[0]), Number(hoursMinutes[1]))
          : startDate.setHours(Number(hoursMinutes[0]), Number(hoursMinutes[1]))
      )
    : null;
  return timed;
};

/* this function is based (but later expanded) on a result from chatGPT */
const extractEventDetails = (inputString: string): Event | null => {
  const eventDetailsRegex =
    /^(.+?)\s+(\d{1,2}\.\d{1,2}\.)(?:\s*-\s*(\d{1,2}\.\d{1,2}\.))?(?:\s+klo\s+(\d{1,2}\.\d{1,2})(?:-(\d{1,2}\.\d{1,2}))?)?(?:\s+(.+))?$/;

  const matches = inputString.match(eventDetailsRegex);

  if (matches && matches[1] && matches[2]) {
    const name = matches[1];
    const startDate = stringToDate(matches[2]) || new Date();
    const endDate = stringToDate(matches[3], startDate) || undefined;
    const startTime = addTimeToDate(matches[4], startDate) || undefined;
    const endTime = addTimeToDate(matches[5], startDate, endDate) || undefined;
    const location = matches[6] || undefined;

    return {
      name,
      startDate: startTime || startDate,
      endDate: endTime || endDate || startTime || startDate,
      location,
    };
  } else {
    return null;
  }
};

export default extractEventDetails;
