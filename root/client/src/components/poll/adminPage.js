import '../../css/response_admin.css';
import { React, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ResultsList } from './resultsList'

export const AdminPage = () => {
  const { pollUuid } = useParams();
  const [pollData, setPollData] = useState('');
  const listMobileDescription = useRef(null);
  const btnMobileOpen = useRef(null);
  const btnMobileClose = useRef(null);
  const btnDescriptionExpand = useRef(null);

  
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
    window.location = `${window.location.protocol + '//' + window.location.host}/polls/${pollUuid}/update`;
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

  const handleOpenDescription = (e) => {
    e.preventDefault();
    listMobileDescription.current.classList.remove('hide');
    btnMobileOpen.current.classList.add('hide');
    btnMobileClose.current.classList.remove('hide');
  }

  const handleCloseDescription = (e) => {
    e.preventDefault();
    listMobileDescription.current.classList.add('hide');
    btnMobileOpen.current.classList.remove('hide');
    btnMobileClose.current.classList.add('hide');
  }

  const handleDescriptionExpand = (e) => {
    e.preventDefault();
    if (btnDescriptionExpand.current.classList.contains('expand')) {
      btnDescriptionExpand.current.classList.remove('expand');
    } else {
      btnDescriptionExpand.current.classList.add('expand');
    }
  }

  const { name, description, location, duration, availabilities, responses } = pollData;

  return (
    <div>
      <header>
        <h1>
          <svg id='svg-logo' xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
          <span>GetTogether</span>
        </h1>
        <h2>{name}</h2>
        <div id='header-desktop-poll-btns'>
          <ul id="ul-desktop-poll-btns">
            <li>
              <button id='btn-admin-mobile-edit' onClick={(e) => handleUpdate(e)}>
                Edit Poll
              </button>
            </li>
            <li>
              <button id='btn-admin-mobile-delete' onClick={handleDelete}>
                Delete Poll
              </button>
            </li>
          </ul>
        </div>
        <div id="header-poll-btns">
          <button id='btn-mobile-open' className='hide' onClick={handleOpenDescription} ref={btnMobileOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" fill="#FFFFFF"/></svg>
          </button>
          <button id='btn-mobile-close' onClick={handleCloseDescription} ref={btnMobileClose}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" fill="#FFFFFF"/></svg>
          </button>
        </div>
        <ul id="ul-mobile-admin-description" ref={listMobileDescription}>
          {description && 
            <li id='list-item-mobile-description'>
              <svg id="svg-description" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z"/></svg>
              {description.length >= 90 && <button onClick={handleDescriptionExpand} ref={btnDescriptionExpand}>
                <svg id="svg-description-expand" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
              </button>}
              <span>{description}</span>
            </li>}
          {location &&
            <li>
              <svg id="svg-location" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 384 512"><path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/></svg>
              <span>{location}</span>
            </li>}
        </ul>
      </header>
      <main>
        <div id='div-description'>
          <ul id="ul-poll-description">
            {description && 
              <li>
                <svg id="svg-description" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z"/></svg>
                {description}
              </li>}
            {location &&
              <li>
                <svg id="svg-location" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 384 512"><path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/></svg>
                {location}
              </li>}
          </ul>
        </div>
        <div id="div-admin-availabilities">
          <ul id='ul-availabilities'>{availabilities && <ResultsList availabilities={availabilities} responses={responses} duration={duration} />}</ul>
        </div>
        <div id="div-admin-mobile-btns">
          <button id='btn-admin-mobile-edit' onClick={handleUpdate}>
            Edit Poll
          </button>
          <button id='btn-admin-mobile-delete' onClick={handleDelete}>
            Delete Poll
          </button>
        </div>
      </main>
    </div>
  )
};