/*
 startTime (string) (local 24hour time)
 duration (number) (length of time frame)
*/
export const calculateTimeFrame = (startTime, duration) => {
  const [hour, minutes] = startTime.split(':');
  const parsedHour = parseInt(hour);
  const parsedMinute = parseInt(minutes);
  const timeSuffix = parsedHour >= 12 ? 'PM' : 'AM';
  let newMinutes = parsedMinute + parseInt(duration);
  
  if (newMinutes < 60) {
    if (parsedHour === 0) {
      return `12:${minutes}AM - 12:${newMinutes}AM`;
    } else {
      return `${parsedHour <= 12 ? parsedHour : parsedHour - 12}:${minutes}${timeSuffix} - ${parsedHour <= 12 ? parsedHour : parsedHour - 12}:${newMinutes}${timeSuffix}`;
    }
  } else {
    let newHour = newMinutes < 120 ? parsedHour + 1 : parsedHour + 2;

    let endTimeSuffix = newHour >= 12 && newHour < 24 ? 'PM' : 'AM';

    if (newHour > 12 && newHour < 24) {
      newHour -= 12;
    } else if (newHour > 24) {
      newHour -= 24;
    }

    newMinutes = duration < 60 ? newMinutes - 60 : newMinutes - duration;

    if (parsedHour === 0) {
      return `12:${minutes}${timeSuffix} - ${newHour}:${newMinutes === 0 ? '00' : newMinutes}${endTimeSuffix}`;
    } else {
      return `${parsedHour <= 12 ? parsedHour : parsedHour - 12}:${minutes}${timeSuffix} - ${newHour <= 12 ? newHour : newHour - 12}:${newMinutes === 0 ? '00' : newMinutes}${endTimeSuffix}`;
    }
  }
}

export const classTopPosition = (minutes) => {
  if (minutes === '00') {
    return 'p-0';
  } else if (minutes === '15') {
    return 'p-15';
  } else if (minutes === '30') {
    return 'p-30';
  } else if (minutes === '45') {
    return 'p-45';
  }
}

export const getDbTimestamp = (date, startTime) => {
  const timestamp = new Date(`${date}T${startTime}`);
  return [Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' }).format(timestamp), Intl.DateTimeFormat('default', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false, timeZone: 'UTC' }).format(timestamp)];
}

export const getDayOfTheWeek = (dateObj) => {
  const utcDay = dateObj.getUTCDay();
  let dayOfWeek;

  switch(utcDay) {
    case 0:
      dayOfWeek = 'Sunday';
      break;
    case 1:
      dayOfWeek = 'Monday';
      break;
    case 2:
      dayOfWeek = 'Tuesday';
      break;
    case 3:
      dayOfWeek = 'Wednesday';
      break;
    case 4:
      dayOfWeek = 'Thursday';
      break;
    case 5:
      dayOfWeek = 'Friday';
      break;
    case 6:
      dayOfWeek = 'Saturday';
      break;
    default:
      break;
  }
  return dayOfWeek;
}

export const createPossibleTimeBlock = (date, startTime, duration) => {
  const span = document.createElement('span');
  const timezoneOffset = new Date(Date.now()).getTimezoneOffset();
  const timezoneOffsetToHour = timezoneOffset / 60;
  const dateObject = new Date(`${date}T${startTime}:00.000${timezoneOffset > 0 ? '-' : '+'}${timezoneOffsetToHour < 10 ? `0${timezoneOffsetToHour}` : timezoneOffsetToHour}:00`);
  const local24StartTime = `${dateObject.getHours()}:${startTime.split(':')[1]}`;
  const minutes = startTime.split(':')[1];
  const timeframe = calculateTimeFrame(local24StartTime, duration);
  const position = classTopPosition(minutes);
  span.innerHTML = timeframe;
  span.classList.add('temp-timeblock', position, `h-${duration}`);
  return span;
}

export const convertIntToMonth = (monthInt) => {
  switch (monthInt) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return 'Error: Error finding month.';
  }
}

export const findDaysInMonth = (month, year) => {
  switch (month) {
    case 0:
      return 31;
    case 1:
      return leapyear(year) === true ? 29 : 28;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
    default:
      return 'Error: error finding days.';
  }
}

const leapyear = (year) => {
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
};

export const findDayOfWeek = (day) => {
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return 'Error: Error finding Day Of Week.';
  }
}

export const dateDiff = (startDate, endDate) => Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

export const range = (size, startAt = 0) => {
  return [...Array(size).keys()].map(i => i + startAt);
}