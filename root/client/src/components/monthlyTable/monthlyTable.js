import { React, useState, useEffect } from 'react';
import { Calendar } from './calendar.js';
import { convertIntToMonth, findDayOfWeek, findDaysInMonth } from '../../util/tablehelpers.js';

export const MonthlyTable = ({ pollAvailabilities, setPollAvailabilities }) => {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(null);
  const [daysInMonth, setDaysInMonth] = useState(null);

  useEffect(() => {
    const todaysDate = new Date(`${new Date(Date.now()).toISOString().slice(0, 10)}T12:00:00.000Z`);
    const todaysMonth = todaysDate.getMonth();
    const todaysYear = todaysDate.getFullYear(); 
    const fomDateObj = todaysMonth < 9 ? new Date(`${todaysYear}-0${todaysMonth + 1}-01T12:00:00.000Z`) : new Date(`${todaysYear}-${todaysMonth + 1}-01T12:00:00.000Z`);
    setYear(todaysYear);  
    setFirstDayOfMonth(findDayOfWeek(fomDateObj.getDay()));
    setMonth(todaysMonth);
    setDaysInMonth(findDaysInMonth(todaysMonth, todaysYear));
  }, []);

  const handleNextMonth = (e) => {
    e.preventDefault();
    if (month === 11) {
      setMonth(0);
      const newYr = year + 1;
      setDaysInMonth(findDaysInMonth(0, newYr));
      setYear(newYr);
      const dateObjectFOM = new Date(`${newYr}-01-01T12:00:00:00.000Z`);
      setFirstDayOfMonth(findDayOfWeek(dateObjectFOM.getDay()));
    } else {
      const newMth = month + 1;
      setMonth(newMth);
      setDaysInMonth(findDaysInMonth(newMth, year));
      const dateObjectFOM = newMth < 9 ? new Date(`${year}-0${newMth + 1}-01T12:00:00.000Z`) : new Date(`${year}-${newMth + 1}-01T12:00:00.000Z`);
      setFirstDayOfMonth(findDayOfWeek(dateObjectFOM.getDay()));
    }
  };

  const handlePrevMonth = (e) => {
    e.preventDefault();

    if (month === 0) {
      setMonth(11);
      const newYr = year - 1;
      setDaysInMonth(findDaysInMonth(11, newYr));
      setYear(newYr);
      const dateObjectFOM = new Date(`${newYr}-12-01T12:00:00.000Z`);
      setFirstDayOfMonth(findDayOfWeek(dateObjectFOM.getDay()));
    } else {
      const newMth = month - 1;
      setMonth(newMth);
      setDaysInMonth(findDaysInMonth(newMth, year));
      const dateObjectFOM = newMth < 9 ? new Date(`${year}-0${newMth + 1}-01T12:00:00.000Z`) : new Date(`${year}-${newMth + 1}-01T12:00:00.000Z`);
      setFirstDayOfMonth(findDayOfWeek(dateObjectFOM.getDay()));
    }
  }

  const handleDayClick = (year, month, day, e) => {
    e.preventDefault();

    const dateObject = new Date(year, month, day);
    const dateToIso = dateObject.toISOString().slice(0, 10);

    const newPollAvail = {
      ...pollAvailabilities
    };

    if (!newPollAvail[dateToIso]) {
      newPollAvail[dateToIso] = ['allDay'];
    } else {
      delete newPollAvail[dateToIso];
    }

    setPollAvailabilities(newPollAvail);
  }

  return (
    <div id='div-monthlyTable'>
      <div id='monthlyTable-header'>
        <h2>{convertIntToMonth(month)} {year}</h2>
        <div>
          <button id='btn-prev-month' onClick={handlePrevMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
          </button>
          <button id='btn-next-month' onClick={handleNextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
          </button>
        </div>
        <ul id='list-calendar-days'>
          <li><h3>Sun</h3></li>
          <li><h3>Mon</h3></li>
          <li><h3>Tue</h3></li>
          <li><h3>Wed</h3></li>
          <li><h3>Thu</h3></li>
          <li><h3>Fri</h3></li>
          <li><h3>Sat</h3></li>
        </ul>
      </div>
      <Calendar pollAvailabilities={pollAvailabilities} year={year} month={month} firstDayOfMonth={firstDayOfMonth} daysInMonth={daysInMonth} handleDayClick={handleDayClick} />
    </div>
  );
};