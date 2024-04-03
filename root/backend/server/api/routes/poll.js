const express = require('express');
const Poll = require('../../../db/models/poll');
const crypto = require('crypto');
const router = express.Router();
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const { GMAIL_user, GMAIL_pass, NODE_ENV } = process.env;

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: GMAIL_user,
    pass: GMAIL_pass
  }
};

const transport = nodemailer.createTransport(smtpConfig);
router.route('/')
  .get(async (req, res) => {
    try {
      const polls = await Poll.find({}).then(data => {
        return data.map(poll => {
          return {
            id: poll._id.toString(),
            title: poll.name,
            location: poll.location
          }
        });
      });
      res.status(200).json({ response: 'Successfully retrieved all polls', polls });
    } catch(err) {
      res.status(400).json({ response: 'Error: failure to retrieve all polls.' });
    }
  })
  .post(async (req, res) => {
    const { pollName, pollDescription, pollLocation, pollDuration, pollAvailabilities, pollStartDate, pollEndDate, pollStartTime, pollEndTime } = req.body;
  
    try {
      const pollData = {
        name: pollName,
        description: pollDescription,
        location: pollLocation,
        duration: parseInt(pollDuration) * 60,
        availabilities: pollAvailabilities,
        responses: {},
        startDate: pollStartDate,
        endDate: pollEndDate,
        startTime: pollStartTime,
        endTime: pollEndTime
      }
  
      const poll = new Poll(pollData);
      await poll.save();
      res.status(200).json({ pollUuid: poll._id.toString(), response: 'Successfully created poll.' });
    } catch(err) {
      res.status(400).json({ response: 'Failure to create poll.' });
    }
  })

router.patch('/:pollId', async (req, res) => {
  const { pollName, pollDescription, pollLocation, pollDuration, pollAvailabilities, pollStartDate, pollEndDate, pollStartTime, pollEndTime } = req.body;

  try {
    const pollData = {
      name: pollName,
      description: pollDescription,
      location: pollLocation,
      duration: parseInt(pollDuration) * 60,
      availabilities: pollAvailabilities,
      startDate: pollStartDate,
      endDate: pollEndDate,
      startTime: pollStartTime,
      endTime: pollEndTime
    }

    await Poll.findOneAndUpdate({ _id: req.params.pollId }, pollData);
    res.status(200).json({ response: 'Successfully updated poll.' });
  } catch(err) {
    res.status(400).json({ response: 'Failure to update poll.' });
  }
});

router.get('/:pollId/pollInfo', async (req, res) => {
  try {
    const pollData = await Poll.findById(req.params.pollId)
      .then(data => {
        return {
          id: req.params.pollId,
          name: data.name,
          description: data.description,
          availabilities: data.availabilities,
          location: data.location,
          duration: parseInt(data.duration) / 60,
          responses: data.responses,
          startDate: data.startDate,
          endDate: data.endDate,
          startTime: data.startTime,
          endTime: data.endTime
        };
      });
    res.status(200).json({ pollData, response: 'Successfully retrieved poll data.' });
  } catch(err) {
    res.status(400).json({ response: 'Failure to get poll data.' });
  }
});

router.post('/:pollUuid/response', async (req, res) => {
  const { name, choices } = req.body;
  const userUuid = crypto.randomBytes(24).toString('hex');

  try {
    const responsesData = await Poll.findById(req.params.pollUuid).then(data => {
      return data.responses;
    });
  
    let newResponseObj = {};

    if (responsesData) {
      newResponseObj = {
        ...responsesData,
      }
    }

    choices.forEach((timestamp) => {
      if (newResponseObj[timestamp]) {
        newResponseObj[timestamp][userUuid] = name;
      } else {
        newResponseObj[timestamp] = {
          [userUuid]: name
        }
      }
    });  
    const response = await Poll.findOneAndUpdate({ _id: req.params.pollUuid }, { responses: newResponseObj });
    res.status(200).json({ response: 'Successfully added response.', data: response });
  } catch(err) {
    res.status(400).json({ response: 'Failure to create response.' });
  }
});

router.post('/email', async (req, res) => {
  const { email, pollId } = req.body;

  let sharedLink = NODE_ENV === 'PRODUCTION' ? `https://gettogether.onrender.com/polls/${pollId}` : `http://localhost:3000/polls/${pollId}`;
  let adminLink = NODE_ENV === 'PRODUCTION' ? `https://gettogether.onrender.com/admin/${pollId}` : `http://localhost:3000/admin/${pollId}`;

  try {
    const message = {
      from: `<${GMAIL_user}>`,
      to: `<${email}>`,
      subject: 'Checkout Email',
      html: `<div>
              <h1>
                <svg id='svg-logo' xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
                <span>GetTogether</span>
              </h1>
              </br>
              <h2>Here are your links to share:</h2>
              </br>
              <div><b>To Share:</b> ${sharedLink}</div>
              </br></br>
              <div><b>To Edit:</b> ${adminLink}</div>
            </div>`
    };

    await transport.sendMail(message, (err) => {
      if (err) {
        console.log('Error Occured');
        console.log(err.message);
        return;
      }
      console.log('Message sent successfully');
    });

    res.json({ status: 200 });
  } catch(err) {
    console.log(err);
    res.json({ status: 400 });
  }
});

module.exports = router;