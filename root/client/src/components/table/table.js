import { React, useState, useEffect } from 'react';
import '../../css/table.css';
import { TableRow } from './tableRow';
import { convertIntToMonth, dateDiff, range } from '../../util/tablehelpers';
const DAYABBRIEVATIONS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const Table = ({ pollAvailabilities, setPollAvailabilities, duration, startDate, endDate, startTime, endTime }) => {
  const [week, setWeek] = useState({});

  useEffect(() => {
    if (startDate && endDate) {
      const startDateObject = new Date(`${startDate}T12:00:00.000Z`);
      const endDateObject = new Date(`${endDate}T12:00:00.000Z`);
      const tableBtnsDiv = document.getElementById('table-btns')

      const tableLength = dateDiff(startDateObject, endDateObject) + 1;
      if (tableLength && tableLength > 7) {
        const newStateWeek = {
          0: startDateObject[Symbol.toPrimitive]('number'),
          1: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24),
          2: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24 * 2),
          3: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24 * 3),
          4: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24 * 4),
          5: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24 * 5),
          6: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24 * 6),
        }
        tableBtnsDiv.classList.remove('hide');
        setWeek(newStateWeek);
      } else {
        const newStateWeek = {};
        newStateWeek[0] = startDateObject[Symbol.toPrimitive]('number');
        for (let i = 1; i < tableLength; i++) {
          const newDateObject = new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24 * i);
          newStateWeek[i] = newDateObject;
        }
        tableBtnsDiv.classList.add('hide');
        setWeek(newStateWeek);
      }
    }
  }, [startDate, endDate]);

  const handlePrevWeek = (e) => {
    e.preventDefault();
    const sevenDaysFromStart = week[0] - (7 * 24 * 60 * 60 * 1000);
    const startDateObject = new Date(`${startDate}T12:00:00.000Z`);
    if (sevenDaysFromStart < startDateObject[Symbol.toPrimitive]('number')) {
      const newStateWeek = {
        0: startDateObject[Symbol.toPrimitive]('number'),
        1: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24),
        2: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24 * 2),
        3: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24 * 3),
        4: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24 * 4),
        5: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24 * 5),
        6: new Date().setTime(startDateObject.getTime() + 1000 * 60 * 60 * 24 * 6),
      }
      setWeek(newStateWeek);
    } else {
      const newStartWeek = new Date(sevenDaysFromStart);
      const newStateWeek = {
        0: newStartWeek[Symbol.toPrimitive]('number'),
        1: new Date().setTime(newStartWeek.getTime() + 1000 * 60 * 60 * 24),
        2: new Date().setTime(newStartWeek.getTime() + 1000 * 60 * 60 * 24 * 2),
        3: new Date().setTime(newStartWeek.getTime() + 1000 * 60 * 60 * 24 * 3),
        4: new Date().setTime(newStartWeek.getTime() + 1000 * 60 * 60 * 24 * 4),
        5: new Date().setTime(newStartWeek.getTime() + 1000 * 60 * 60 * 24 * 5),
        6: new Date().setTime(newStartWeek.getTime() + 1000 * 60 * 60 * 24 * 6),
      }
      setWeek(newStateWeek);
    }
  }

  const handleNextWeek = (e) => {
    e.preventDefault();
    if (Object.keys(week).length < 7 || new Date(week[6]).toISOString().slice(0, 10) === endDate) {
      return;
    }
  
    const sevenDaysForward = week[6] + (7 * 24 * 60 * 60 * 1000);
    const endDateObject = new Date(`${endDate}T12:00:00.000Z`);
    if (sevenDaysForward > endDateObject[Symbol.toPrimitive]('number')) {
      const numDaysInNewWeek = Math.round((endDateObject - week[6]) / (24 * 60 * 60 * 1000));
      const newStateWeek = {};
      for (let i = 0; i < numDaysInNewWeek - 1; i++) {
        newStateWeek[i] = new Date().setTime(endDateObject.getTime() - (numDaysInNewWeek - i - 1) * 1000 * 60 * 60 * 24);
      }
      newStateWeek[numDaysInNewWeek - 1] = endDateObject[Symbol.toPrimitive]('number');
      setWeek(newStateWeek);
    } else {
      const nextDayOfWeek = new Date(week[6] + (24 * 60 * 60 * 1000));
      const newStateWeek = {
        0: nextDayOfWeek[Symbol.toPrimitive]('number'),
        1: new Date().setTime(nextDayOfWeek.getTime() + 1000 * 60 * 60 * 24),
        2: new Date().setTime(nextDayOfWeek.getTime() + 1000 * 60 * 60 * 24 * 2),
        3: new Date().setTime(nextDayOfWeek.getTime() + 1000 * 60 * 60 * 24 * 3),
        4: new Date().setTime(nextDayOfWeek.getTime() + 1000 * 60 * 60 * 24 * 4),
        5: new Date().setTime(nextDayOfWeek.getTime() + 1000 * 60 * 60 * 24 * 5),
        6: new Date().setTime(nextDayOfWeek.getTime() + 1000 * 60 * 60 * 24 * 6),
      }
      setWeek(newStateWeek);
    }

  }

  const handlePrevDay = (e) => {
    e.preventDefault();
    const previousDay = week[0] - (24 * 60 * 60 * 1000);
    const startDateNum = new Date(`${startDate}T12:00:00.000Z`)[Symbol.toPrimitive]('number');

    if (previousDay < startDateNum) {
      return;
    } else {
      // move the week array 1 day back, as long as start day works.
      const newWeek = {
        0: previousDay
      }

      const endDateNum = new Date(`${endDate}T12:00:00.000Z`)[Symbol.toPrimitive]('number');
      for (let i = 1; i < 7; i++) {
        const nextDayWeek = newWeek[0] + (24 * 60 * 60 * 1000 * i);
        if (nextDayWeek > endDateNum) {
          break;
        } else {
          newWeek[i] = nextDayWeek;
        }
      }
      setWeek(newWeek);
    }
  }

  const handleNextDay = (e) => {
    e.preventDefault();
    
    const nextDay = week[0] + (24 * 60 * 60 * 1000);
    const endDateNum = new Date(`${endDate}T12:00:00.000Z`)[Symbol.toPrimitive]('number');
    if (nextDay > endDateNum) {
      return;
    } else {
      const newWeek = {
        0: nextDay
      };
      // move the week array 1 day next, as long as end day is the last day of the week.
      for (let i = 1; i < 7; i++) {
        const nextDayWeek = newWeek[0] + (24 * 60 * 60 * 1000 * i);
        if (nextDayWeek > endDateNum) {
          break;
        } else {
          newWeek[i] = nextDayWeek;
        }
      }
      setWeek(newWeek);
    }
  }

  const tbody = range(endTime - startTime, startTime).map((hour, idx) => {
    return (
      <tr key={idx}>
        <td>{hour < 12  ? `${hour === 0 ? 12 : hour} A.M.` : `${hour - 12 === 0 ? 12 : hour - 12} P.M.`}</td>
        <TableRow week={week} hour={hour} duration={duration} setPollAvailabilities={setPollAvailabilities} pollAvailabilities={pollAvailabilities} />
      </tr>
    );
  });

  const tHeadRow = Object.keys(week).map((weekDay, idx) => {
    const dateObj = new Date(week[weekDay]);
    return (
      <th key={idx}>
        <h3>{DAYABBRIEVATIONS[dateObj.getDay()]}</h3>
        <h2>{new Date (week[weekDay]).getUTCDate()}</h2>
      </th>
    );
  });

  const startDayObj = new Date(week[0]);
  const endDayObj = new Date(week[Object.keys(week).length - 1]);

  return (
    <div id="div-availabilities-table">
      <div id='table-desktop'>
        <div id="table-header">
          {week && <h2 id="week-current">{week[0] && `${DAYABBRIEVATIONS[startDayObj.getDay()]}, ${convertIntToMonth(startDayObj.getMonth())} ${startDayObj.getDate()}, ${startDayObj.getFullYear()}`}{startDayObj.getTime() !== endDayObj.getTime() && ` - `}{startDayObj.getTime() !== endDayObj.getTime() && `${DAYABBRIEVATIONS[endDayObj.getDay()]}, ${convertIntToMonth(endDayObj.getMonth())} ${endDayObj.getDate()}, ${endDayObj.getFullYear()}`}</h2>}
          <div id="table-btns">
            <ul>
              <li>
                <button id="btn-prev-week" onClick={handlePrevWeek}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>
                </button>
              </li>
              <li>
                <button id="btn-prev-day" onClick={handlePrevDay}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                </button>
              </li>
              <li>
                <div id="table-mobile-currentDay">{new Date(week[0]).toLocaleDateString()}</div>
              </li>
              <li>
                <button id="btn-next-day" onClick={handleNextDay}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                </button>
              </li>
              <li>
                <button id="btn-next-week" onClick={handleNextWeek}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              {tHeadRow}
            </tr>
          </thead>
          <tbody>{tbody}</tbody>
        </table>
      </div>
    </div>
  )
}

/*
<div id="table-mobile">
<div id="table-mobile-header">
          <button id="btn-prev-day" onClick={handlePrevDay}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
          </button>
          <div id="table-mobile-currentDay">{new Date(week[0]).toLocaleDateString()}</div>
          <button id="btn-next-day" onClick={handleNextDay}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
          </button>
        </div>
  <div id="table-mobile-header">
    <button id="btn-prev-day" onClick={handlePrevDay}>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
    </button>
    <div id="table-mobile-currentDay">{mobileDay.toLocaleDateString()}</div>
    <button id="btn-next-day" onClick={handleNextDay}>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
    </button>
  </div>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>
          <h3>{DAYABBRIEVATIONS[mobileDay.getDay()]}</h3>
          <h2>{mobileDay.getUTCDate()}</h2>
        </th>
      </tr>
    </thead>
    <tbody>{tbody}</tbody>
  </table>
</div>
*/