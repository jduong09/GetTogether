import './css/meyers_reset.css';
import './css/App.css';
import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/landingPage';
import { Dashboard } from './components/user/dashboard';
import { NewPoll } from './components/user/newPoll';
import { UpdatePoll } from './components/user/updatePoll';
import { ResponsePage } from './components/poll/responsePage';
import { AdminPage } from './components/poll/adminPage';
import { CheckoutPage } from './components/poll/checkoutPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/polls/new' element={<NewPoll />} />
          <Route path='/polls/:pollUuid' element={<ResponsePage />} />
          <Route path='/polls/:pollUuid/update' element={<UpdatePoll />} />
          <Route path='/admin/:pollUuid' element={<AdminPage />} />
          <Route path='/polls/:pollUuid/checkout' element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
