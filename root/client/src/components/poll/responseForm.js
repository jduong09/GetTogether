import { React, useState } from 'react';
import { AvailabilitiesList } from './availabilitiesTable';

export const ResponseForm = ({ pollUuid, availabilities, responses, duration }) => {
  const [name, setName] = useState('');
  const [choices, setChoices] = useState([]);

  const handleUserChoice = (e) => {
    e.preventDefault();
    const timestamp = e.target.parentElement.getAttribute('data-timestamp');
    let newChoicesObj = [...choices];

    if (!newChoicesObj.includes(timestamp)) {
      newChoicesObj.push(timestamp)
      e.target.classList.add('selected');
      e.target.innerText = 'Selected';
      e.target.parentElement.classList.add('selected');
    } else {
      newChoicesObj = choices.filter((chosenTimestamps) => chosenTimestamps !== timestamp);
      e.target.classList.remove('selected');
      e.target.innerText = 'Select Time';
      e.target.parentElement.classList.remove('selected');
    }
    setChoices(newChoicesObj);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`/polls/${pollUuid}/response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          choices
        })
      });
      window.location = '/';
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div id="div-form-response">
      <form id="form-response" onSubmit={(e) => handleFormSubmit(e)}>
        <AvailabilitiesList
          availabilities={availabilities}
          responses={responses}
          choices={choices}
          handleUserChoice={handleUserChoice}
          duration={duration}
        />
        <div id='div-form-submit'>
          <label htmlFor='name'>
            <input id='name' name='name' placeholder='Name...' value={name} onChange={(e) => setName(e.target.value)} required/>
            <span></span>
          </label>
          <button id="btn-submit">Submit Response</button>
        </div>
      </form>
    </div>
  )
};