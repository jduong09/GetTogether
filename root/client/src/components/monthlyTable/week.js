import { React } from 'react';
import { convertIntToMonth } from '../../util/tablehelpers';

export const Week = ({ pollAvailabilities, year, month, week, handleDayClick }) => {
  const days = week.map((day, idx) => {
    const todaysDate = new Date();
    const date = new Date(year, month, day)
    const dateISO = date.toISOString().slice(0, 10);
    return (day === '' ?
      <li key={idx} className='monthlyCalendar-day disabled'></li> :
      <li key={idx} className={`${pollAvailabilities[dateISO] ? 'selected' : ''} monthlyCalendar-day ${date < todaysDate ? 'disabled' : ''}`} onClick={(e) => handleDayClick(year, month, day, e)}>
        <span>{convertIntToMonth(month).slice(0, 3)}</span>
        <span>{day}</span>
      </li>);
  }) ;

  return <ul className='week'>{days}</ul>;
}