import { React } from 'react';
import { PollForm } from '../poll/pollForm';
import { apiRequest } from '../../util/api';
import '../../css/form.css';

export const NewPoll = () => {
  const handleSubmit = async (e, formData, action, method) => {
    e.preventDefault();
    try {
      const { pollUuid } = await apiRequest(action, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      window.location = `/polls/${pollUuid}/checkout`;
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      <header>
        <h1>
          <svg id='svg-logo' xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
          <span>GetTogether</span>
        </h1>
        <h2>New Poll</h2>
        <div></div>
      </header>
      <main>
        <div id="div-form">
          <PollForm handleSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
};