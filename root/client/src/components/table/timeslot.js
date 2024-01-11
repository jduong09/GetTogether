import { React, useState, useEffect } from 'react';
import { classTopPosition, getDbTimestamp, createPossibleTimeBlock } from '../../util/tablehelpers';
import { TimeBlock } from './timeblock';

export const TimeSlot = ({ week, date, startTime, duration, setPollAvailabilities, pollAvailabilities, hour }) => {
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    // Check to see if this timeslot with date and starttime is in the poll availabilities in order to become selected.
    if (pollAvailabilities.hasOwnProperty(date)) {
      const timezoneOffset = new Date(Date.now()).getTimezoneOffset();
      const timezoneOffsetToHour = timezoneOffset / 60;
      const dateObject = new Date(`${date}T${startTime}:00.000${timezoneOffset > 0 ? '-' : '+'}${timezoneOffsetToHour < 10 ? `0${timezoneOffsetToHour}` : timezoneOffsetToHour}:00`);
      const convertedUTCTime = dateObject.toISOString().slice(11, 19);
      if (pollAvailabilities[date].includes(convertedUTCTime)) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    } else {
      setSelected(false);
    }
  }, [date, week]);

  const handleMouseenter = (e) => {
    e.preventDefault();

    if (e.target.children.length === 0) {
      const possibleTimeBlock = createPossibleTimeBlock(date, startTime, duration);
      e.target.appendChild(possibleTimeBlock);
    }
  }

  const handleMouseleave = (e) => {
    e.preventDefault();
    
    if (e.target.querySelector('span.temp-timeblock')) {
      e.target.querySelector('span.temp-timeblock').remove();
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const [dbDate, dbTime] = getDbTimestamp(date, startTime);

    const newPollAvail = {
      ...pollAvailabilities,
    };

    if (!newPollAvail[dbDate]) {
      newPollAvail[dbDate] = [dbTime];
      setSelected(true);
      setPollAvailabilities(newPollAvail);
    } else if (!newPollAvail[dbDate].includes(dbTime)) {
      newPollAvail[dbDate] = [...newPollAvail[dbDate], dbTime];
      setSelected(true);
      setPollAvailabilities(newPollAvail);
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newPollAvail = {
      ...pollAvailabilities,
    };

    const [dbDate, dbTime] = getDbTimestamp(date, startTime);
    const array = newPollAvail[dbDate].filter((time) => time !== dbTime);

    if (!array.length) {
      delete newPollAvail[dbDate];
    } else {
      newPollAvail[dbDate] = array;
    }
    
    setSelected(false);
    setPollAvailabilities(newPollAvail);
  }

  const currentTimestamp = new Date();
  const timeSlotTimeStamp = new Date(`${date}T${startTime}`);

  return (
    <div
      className={`cell-half-hour ${timeSlotTimeStamp < currentTimestamp ? 'disabled' : ''}`}
      data-time={startTime} onClick={(e) => handleClick(e)}
      onMouseEnter={handleMouseenter}
      onMouseLeave={handleMouseleave}>
      {selected && 
        <TimeBlock
          handleDelete={handleDelete}
          date={date}
          startTime={startTime}
          duration={duration}
          classTopPosition={classTopPosition(startTime.split(':')[1])}
          classHeight={`h-${duration}`}
        />
      }
    </div>
  );
}