import { React, useState, useRef } from 'react';
import { Table } from '../table/table';
import { MonthlyTable } from '../monthlyTable/monthlyTable';
import { range } from '../../util/tablehelpers';

export const PollForm = ({ handleSubmit, editData }) => {
  const [pollName, setPollName] = useState(editData ? editData.name : '');
  const [pollDescription, setPollDescription] = useState(editData ? editData.description : '');
  const [pollLocation, setPollLocation] = useState(editData ? editData.location : '');
  const [pollDuration, setPollDuration] = useState(editData ? parseInt(editData.duration) : '15');
  const [pollAvailabilities, setPollAvailabilities] = useState(editData ? editData.availabilities : {});
  const [toggleDays, setToggleDays] = useState(editData && editData.duration === 1440 ? true : false);
  const divAvailError = useRef(null);
  const divBackground = useRef(null);

  const [pollStartDate, setPollStartDate] = useState(editData ? editData.startDate : '');
  const [pollEndDate, setPollEndDate] = useState(editData ? editData.endDate : '');
  
  const [pollStartTime, setPollStartTime] = useState(editData ? editData.startTime : 0);
  const [pollEndTime, setPollEndTime] = useState(editData ? editData.endTime : 24);

  const resetFormData = () => {
    setPollName('');
    setPollDescription('');
    setPollLocation('');
    setPollDuration('15');
    setPollAvailabilities({});
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!Object.keys(pollAvailabilities).length) {
      divAvailError.current.classList.remove('hide');
      divBackground.current.classList.remove('hide');
      return;
    }

    divAvailError.current.classList.add('hide');
    divBackground.current.classList.add('hide');

    toggleDays ? handleSubmit(e, { pollName, pollDescription, pollLocation, pollDuration, pollAvailabilities, pollStartDate : null, pollEndDate : null, pollStartTime: null, pollEndTime: null }, e.target.action, editData ? 'PATCH' : 'POST') : handleSubmit(e, { pollName, pollDescription, pollLocation, pollDuration, pollAvailabilities, pollStartDate, pollEndDate, pollStartTime, pollEndTime }, e.target.action, editData ? 'PATCH' : 'POST');
    resetFormData();
  }

  const handleTimesToggle = (e) => {
    e.preventDefault();

    setToggleDays(false);
    setPollDuration('15');
    setPollAvailabilities({});
  }

  const handleDaysToggle = (e) => {
    e.preventDefault();

    setToggleDays(true);
    setPollDuration('1440');
    setPollAvailabilities({});
  }

  const handleDurationClick = (minutes, e) => {
    const previousDuration = document.querySelector(`li.list-item-duration[data-duration="${pollDuration}"]`);
    previousDuration.classList.remove('selected');
    if (!e.target.classList.contains('selected')) {
      e.target.classList.add('selected');
    }
    setPollDuration(minutes);
  }

  const handleCloseModal = (e) => {
    e.preventDefault();
    divAvailError.current.classList.add('hide');
    divBackground.current.classList.add('hide');
  }

  const listDurations = toggleDays
    ? <ul id='list-durations'><li className="list-item-duration selected" data-duration='all-day'>All</li></ul>
    : (<ul id='list-durations'><li className="list-item-duration selected" data-duration='15' onClick={(e) => handleDurationClick(15, e)}>15</li><li className="list-item-duration" data-duration='30' onClick={(e) => handleDurationClick(30, e)}>30</li><li className="list-item-duration" data-duration='60' onClick={(e) => handleDurationClick(60, e)}>60</li></ul>);

  const startRangeEnd = pollEndTime ? pollEndTime - 1 : 23;
  const endRangeStart = pollStartTime ? pollStartTime + 1 : 0;

  const listStartOptions = range(startRangeEnd + 1, 0).map((hour, idx) => {
    return (
      <option key={idx} value={parseInt(hour)}>{hour < 12  ? `${hour === 0 ? 12 : hour}:00 A.M.` : `${hour - 12 === 0 ? 12 : hour - 12}:00 P.M.`}</option>
    )
  });

  const listEndOptions = range(25 - endRangeStart, endRangeStart).map((hour, idx) => {
    if (hour === 24) {
      return (
        <option key={idx} value={parseInt(hour)}>12:00 AM</option>
      )
    } else {
      return (
        <option key={idx} value={parseInt(hour)}>{hour < 12  ? `${hour === 0 ? 12 : hour}:00 A.M.` : `${hour - 12 === 0 ? 12 : hour - 12}:00 P.M.`}</option>
      )
    }
  });

  return (
    <form id='form-create-edit' action={editData ? `/polls/${editData.id}` : '/polls'} onSubmit={(e) => handleFormSubmit(e)}>
      <div>
        <label htmlFor='inputName'>Name
          <input id='inputName' name='pollName' type='text' onChange={e => setPollName(e.target.value)} placeholder='John Doe' value={pollName} required/>
          <span></span>
        </label>
      </div>
      <div>
        <label htmlFor='inputDescription'>Description
          <input id='inputDescription' name='pollDescription' type='text' onChange={e => setPollDescription(e.target.value)} placeholder='Meeting, Conference, Birthday Party...' value={pollDescription} />
          <span></span>
        </label>
      </div>
      <div>
        <label htmlFor='inputLocation'>Location
          <input id='inputLocation' name='pollLocation' type='text' onChange={e => { setPollLocation(e.target.value) }} placeholder='Conference Room A' value={pollLocation} />
          <span></span>
        </label>
      </div>
      <div id="div-duration">Duration {listDurations}</div>
      {!toggleDays && 
        <div>
          <label htmlFor='inputStartDate'>Start Date
            <input id='inputStartDate' name='pollStartDate' type='date' onChange={e => { setPollStartDate(e.target.value) }} value={pollStartDate} />
          </label>
        </div>}
      {!toggleDays &&
        <div>
          <label htmlFor='inputEndDate'>End Date
            <input id='inputEndDate' name='pollEndDate' type='date' onChange={e => { setPollEndDate(e.target.value) }} value={pollEndDate} />
          </label>
        </div>}
      {!toggleDays &&
        <div id='div-select-times'>
          <label className='label-select-time' htmlFor='selectStartTime'>Start Time
            <select id='selectStartTime' onChange={(e) => setPollStartTime(parseInt(e.target.value))} value={pollStartTime} >{listStartOptions}</select>
          </label>
          <label className='label-select-time' htmlFor='selectEndTime'>End Time
            <select id='selectEndTime' onChange={(e) => setPollEndTime(parseInt(e.target.value))} value={pollEndTime} >{listEndOptions}</select>
          </label>
        </div>}
      {/* Does this input need to be here anymore. */}
      <label htmlFor='inputAvailabilities'>
        <input id='inputAvailabilities' name='pollAvailabilities' type='text' value={pollAvailabilities} readOnly="readOnly" hidden/>
      </label>
      <div id='div-calendars'>
        <ul>
          <li>
            <button id='btn-toggle-times' className={!toggleDays ? 'selected' : ''} onClick={handleTimesToggle}>Times</button>
            <button id='btn-toggle-days' className={toggleDays ? 'selected' : ''} onClick={handleDaysToggle}>Days</button>
          </li>
        </ul>
        {toggleDays
          ? <MonthlyTable setPollAvailabilities={setPollAvailabilities} pollAvailabilities={pollAvailabilities} />
          : (pollStartDate && pollEndDate && <Table
              duration={pollDuration}
              setPollAvailabilities={setPollAvailabilities}
              pollAvailabilities={pollAvailabilities}
              startDate={pollStartDate}
              endDate={pollEndDate}
              startTime={pollStartTime}
              endTime={pollEndTime} />)}
        <div id='div-availabilities-error-message' className='hide' ref={divAvailError}>
          <span>Form cannot be submitted without availabilities.</span>
          <button id="btn-modal-close" onClick={handleCloseModal}>Close</button>
        </div>
      </div>
      <div id="div-background-overlay" className='hide' ref={divBackground}></div>
      <button type='submit' id="btn-form-submit">{editData ? 'Update' : 'Create'}</button>
    </form>
  );
};