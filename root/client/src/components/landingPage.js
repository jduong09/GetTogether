import { useEffect, useState, useRef, React } from 'react';
import '../css/landingPage.css';

export const LandingPage = () => {
  const [carouselIdx, setCarouselIdx] = useState(1);
  const listStep1 = useRef(null);
  const listStep2 = useRef(null);
  const listStep3 = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 922) {
      listStep2.current.classList.add('hide');
      listStep3.current.classList.add('hide');
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < 922) {
        listStep1.current.classList.remove('hide');
        listStep2.current.classList.add('hide');
        listStep3.current.classList.add('hide');
        setCarouselIdx(1);
      } else {
        listStep1.current.classList.remove('hide');
        listStep2.current.classList.remove('hide');
        listStep3.current.classList.remove('hide');
      }
    });
  }, []);

  const handleNewPoll = (e) => {
    e.preventDefault();
    window.location = '/polls/new';
  }

  const handlePrevClick = (e) => {
    e.preventDefault();
    if (carouselIdx === 1) {
      listStep1.current.classList.add('hide');
      listStep3.current.classList.remove('hide');
    } else if (carouselIdx === 2) {
      listStep2.current.classList.add('hide');
      listStep1.current.classList.remove('hide');
    } else {
      listStep3.current.classList.add('hide');
      listStep2.current.classList.remove('hide');
    }
    console.log(carouselIdx === 1 ? 3 : carouselIdx - 1);
    setCarouselIdx(carouselIdx === 1 ? 3 : carouselIdx - 1);
  }

  const handleNextClick = (e) => {
    e.preventDefault();
    if (carouselIdx === 1) {
      listStep1.current.classList.add('hide');
      listStep2.current.classList.remove('hide');
    } else if (carouselIdx === 2) {
      listStep2.current.classList.add('hide');
      listStep3.current.classList.remove('hide');
    } else {
      listStep3.current.classList.add('hide');
      listStep1.current.classList.remove('hide');
    }
    console.log(carouselIdx === 3 ? 1 : carouselIdx + 1);
    setCarouselIdx(carouselIdx === 3 ? 1 : carouselIdx + 1);
  }

  return (
    <div>
      <header>
        <h1>
          <svg id='svg-logo' xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
          <span>GetTogether</span>
        </h1>
        <h2>Simple Meeting Scheduler</h2>
        <button id='btn-poll-new' onClick={handleNewPoll}>Get Started</button>
      </header>
      <main>
        <div id='div-hero'>
          <img id='img-hero' src='/videoconference.png' alt='4 people talking to each other' />
          <div>
            <h1>Find the Perfect Time.</h1>
            <span>Create polls to find the best time for you and your peers to GetTogether.</span>
            <button id='btn-main-new' onClick={handleNewPoll}>Get Started</button>
          </div>
        </div>
        <div id='div-steps'>
          <button id='btn-prev-step' onClick={handlePrevClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
          </button>
          <ul id='list-workflow-steps'>
            <li ref={listStep1}>
              <h2>Fill out the form</h2>
              <img id='img-create' src='/tablet_create.png' alt='UI for creating poll.' />
              <img id='img-desktop-create' src='/desktop_create.png' alt='UI for creating poll.' />
            </li>
            <li ref={listStep2}>
              <h2>Have peers respond</h2>
              <img id='img-response' src='/tablet_response.png' alt='UI for responding to poll' />
              <img id='img-desktop-response' src='/desktop_response.png' alt='UI for responding to poll' />
            </li>
            <li ref={listStep3}>
              <h2>Find the ideal meeting time</h2>
              <img id='img-admin' src='/tablet_admin.png' alt='UI for seeing results' />
              <img id='img-desktop-admin' src='/desktop_admin.png' alt='UI for seeing results' />
            </li>
          </ul>
          <button id='btn-next-step' onClick={handleNextClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
          </button>
        </div>
      </main>
    </div>
  );
};