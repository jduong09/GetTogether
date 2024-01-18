import '../../css/response_admin.css';
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ResultsList } from './resultsList'

export const AdminPage = () => {
  const { pollUuid } = useParams();
  const [pollData, setPollData] = useState('');
  
  useEffect(() => {
    const fetchPollData = async () => {
      const response = await fetch(`/polls/${pollUuid}/pollInfo`, { method: 'GET' });
      
      const data = response.json();
      if (response.ok) {
        return data;
      }
    }

    fetchPollData().then(data => setPollData(data.pollData));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    // route to update form.
    window.location = `http://localhost:3000/polls/${pollUuid}/update`
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`/admin/${pollUuid}`, { method: 'DELETE' });

    const data = response.json();

    if (response.ok) {
      window.location = '/';
    } else {
      console.error(data);
    }
  };

  const { name, duration, availabilities, responses } = pollData;

  return (
    <div>
      <header>
        <h1>
          <svg id='svg-logo' xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
          <span>GetTogether</span>
        </h1>
        <h2>{name}</h2>
        <div id="header-poll-btns">
          <ul id="list-desktop">
            <li>
              <button id='btn-admin-update' onClick={(e) => handleUpdate(e)}>Update Poll</button>
            </li>
            <li>
              <button id='btn-admin-delete' onClick={handleDelete}>Delete Poll</button>
            </li>
          </ul>
          <ul id="list-mobile">
            <li>
              <button id='btn-admin-mobile-edit'>
                <svg id="svg-edit" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
              </button>
            </li>
            <li>
              <button id='btn-admin-mobile-delete'>
                <svg id="svg-delete" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
              </button>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <div id="div-admin-availabilities">
          <ul id='ul-availabilities'>{availabilities && <ResultsList availabilities={availabilities} responses={responses} duration={duration} />}</ul>
        </div>
      </main>
    </div>
  )
};