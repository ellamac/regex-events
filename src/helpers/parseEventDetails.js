const stringToDate = (string, startDate) => {
  /* if string is not null
  make 25.12. -> 2023/12/25 (date) */

  const date = string
    ? new Date(
        string.split('.').concat(new Date().getFullYear()).reverse().join('/')
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
const addTimeToDate = (time, startDate, endDate) => {
  const hoursMinutes = time ? time.split('.') : null;
  const timed = hoursMinutes
    ? new Date(
        endDate
          ? endDate.setHours(hoursMinutes[0], hoursMinutes[1])
          : startDate.setHours(hoursMinutes[0], hoursMinutes[1])
      )
    : null;
  return timed;
};

/* this function is based (but later expanded) on a result from chatGPT */
const extractEventDetails = (inputString) => {
  const eventDetailsRegex =
    /^(.+?)\s+(\d{1,2}\.\d{1,2}\.)(?:\s*-\s*(\d{1,2}\.\d{1,2}\.))?(?:\s+klo\s+(\d{1,2}\.\d{1,2})(?:-(\d{1,2}\.\d{1,2}))?)?(?:\s+(.+))?$/;

  const matches = inputString.match(eventDetailsRegex);

  if (matches && matches[1] && matches[2]) {
    const name = matches[1];
    const startDate = stringToDate(matches[2]);
    const endDate = stringToDate(matches[3], startDate) || undefined;
    const startTime = addTimeToDate(matches[4], startDate) || undefined;
    const endTime = addTimeToDate(matches[5], startDate, endDate) || undefined;
    const location = matches[6] || undefined;

    return {
      name,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
    };
  } else {
    return null;
  }
};

export default extractEventDetails;
