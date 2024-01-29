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
    window.location = `${window.location.protocol + '//' + window.location.host}/${pollUuid}/update`;
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

  const { name, description, location, duration, availabilities, responses } = pollData;

  return (
    <div>
      <header>
        <h1>
          <svg id="svg-logo" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 512 512"><path d="M99 414.3c1.1 5.7-2.3 11.1-8 12.3-5.4 1.1-10.9-2.3-12-8-1.1-5.4 2.3-11.1 7.7-12.3 5.4-1.2 11.1 2.3 12.3 8zm143.1 71.4c-6.3 4.6-8 13.4-3.7 20 4.6 6.6 13.4 8.3 20 3.7 6.3-4.6 8-13.4 3.4-20-4.2-6.5-13.1-8.3-19.7-3.7zm-86-462.3c6.3-1.4 10.3-7.7 8.9-14-1.1-6.6-7.4-10.6-13.7-9.1-6.3 1.4-10.3 7.7-9.1 14 1.4 6.6 7.6 10.6 13.9 9.1zM34.4 226.3c-10-6.9-23.7-4.3-30.6 6-6.9 10-4.3 24 5.7 30.9 10 7.1 23.7 4.6 30.6-5.7 6.9-10.4 4.3-24.1-5.7-31.2zm272-170.9c10.6-6.3 13.7-20 7.7-30.3-6.3-10.6-19.7-14-30-7.7s-13.7 20-7.4 30.6c6 10.3 19.4 13.7 29.7 7.4zm-191.1 58c7.7-5.4 9.4-16 4.3-23.7s-15.7-9.4-23.1-4.3c-7.7 5.4-9.4 16-4.3 23.7 5.1 7.8 15.6 9.5 23.1 4.3zm372.3 156c-7.4 1.7-12.3 9.1-10.6 16.9 1.4 7.4 8.9 12.3 16.3 10.6 7.4-1.4 12.3-8.9 10.6-16.6-1.5-7.4-8.9-12.3-16.3-10.9zm39.7-56.8c-1.1-5.7-6.6-9.1-12-8-5.7 1.1-9.1 6.9-8 12.6 1.1 5.4 6.6 9.1 12.3 8 5.4-1.5 9.1-6.9 7.7-12.6zM447 138.9c-8.6 6-10.6 17.7-4.9 26.3 5.7 8.6 17.4 10.6 26 4.9 8.3-6 10.3-17.7 4.6-26.3-5.7-8.7-17.4-10.9-25.7-4.9zm-6.3 139.4c26.3 43.1 15.1 100-26.3 129.1-17.4 12.3-37.1 17.7-56.9 17.1-12 47.1-69.4 64.6-105.1 32.6-1.1 .9-2.6 1.7-3.7 2.9-39.1 27.1-92.3 17.4-119.4-22.3-9.7-14.3-14.6-30.6-15.1-46.9-65.4-10.9-90-94-41.1-139.7-28.3-46.9 .6-107.4 53.4-114.9C151.6 70 234.1 38.6 290.1 82c67.4-22.3 136.3 29.4 130.9 101.1 41.1 12.6 52.8 66.9 19.7 95.2zm-70 74.3c-3.1-20.6-40.9-4.6-43.1-27.1-3.1-32 43.7-101.1 40-128-3.4-24-19.4-29.1-33.4-29.4-13.4-.3-16.9 2-21.4 4.6-2.9 1.7-6.6 4.9-11.7-.3-6.3-6-11.1-11.7-19.4-12.9-12.3-2-17.7 2-26.6 9.7-3.4 2.9-12 12.9-20 9.1-3.4-1.7-15.4-7.7-24-11.4-16.3-7.1-40 4.6-48.6 20-12.9 22.9-38 113.1-41.7 125.1-8.6 26.6 10.9 48.6 36.9 47.1 11.1-.6 18.3-4.6 25.4-17.4 4-7.4 41.7-107.7 44.6-112.6 2-3.4 8.9-8 14.6-5.1 5.7 3.1 6.9 9.4 6 15.1-1.1 9.7-28 70.9-28.9 77.7-3.4 22.9 26.9 26.6 38.6 4 3.7-7.1 45.7-92.6 49.4-98.3 4.3-6.3 7.4-8.3 11.7-8 3.1 0 8.3 .9 7.1 10.9-1.4 9.4-35.1 72.3-38.9 87.7-4.6 20.6 6.6 41.4 24.9 50.6 11.4 5.7 62.5 15.7 58.5-11.1zm5.7 92.3c-10.3 7.4-12.9 22-5.7 32.6 7.1 10.6 21.4 13.1 32 6 10.6-7.4 13.1-22 6-32.6-7.4-10.6-21.7-13.5-32.3-6z"/></svg>
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
          <button id='btn-mobile-open' onClick={handleOpenDescription} ref={btnMobileOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" fill="#FFFFFF"/></svg>
          </button>
          <button id='btn-mobile-close' className='hide' onClick={handleCloseDescription} ref={btnMobileClose}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" fill="#FFFFFF"/></svg>
          </button>
          <ul id="ul-mobile-admin-description" className='hide' ref={listMobileDescription}>
            {description && 
              <li>
                <svg id="svg-description" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z"/></svg>
                <span>{description}</span>
              </li>}
            {location &&
              <li>
                <svg id="svg-location" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 384 512"><path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/></svg>
                <span>{location}</span>
              </li>}
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
      </main>
    </div>
  )
};