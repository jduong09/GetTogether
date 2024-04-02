import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/checkout.css';

export const CheckoutPage = () => {
  const { pollUuid } = useParams();
  const [pollData, setPollData] = useState(null);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchPollData = async () => {
      const response = await fetch(`/polls/${pollUuid}/pollInfo`);
      const data = await response.json();

      return data;
    }

    fetchPollData().then(data => setPollData(data.pollData));
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/polls/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        pollId: pollData.id,
      }),
    });

    const data = response.json();
    console.log(data);
    return;
  }

  return (
    <div>
      <header>
        <h1>
          <svg id='svg-logo' xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
          <span>GetTogether</span>
        </h1>
        <h2>Checkout</h2>
        <div></div>
      </header>
      <main>
        {pollData &&
          <div>
            <div className='div-link'>
              Share this link to get responses:
              <h2><a href={`${window.location.protocol + '//' + window.location.host}/polls/${pollData.id}`} target='_blank' rel='noreferrer'>Link</a></h2>
            </div>
            <div className='div-link'>
              Use this link to see to make changes:
              <h2><a href={`${window.location.protocol + '//' + window.location.host}/admin/${pollData.id}`} target='_blank' rel='noreferrer'>Link</a></h2>
            </div>
            <div>
              <h2>Send links to email</h2>
              <form id="form-email">
                <label >Email:
                  <input type="text" id="input-email" name="input-email" placeholder="foobar@gmail.com" value={email} onChange={handleEmailChange} />
                </label>
                <button onClick={handleEmailSubmit}>Send Email</button>
              </form>
            </div>
          </div>}
      </main>
    </div>
  );
}