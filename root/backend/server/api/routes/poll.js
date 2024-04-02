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

  let sharedLink = NODE_ENV === 'production' ? `https://gettogether.onrender.com/polls/${pollId}` : `http://localhost:3000/polls/${pollId}`;
  let adminLink = NODE_ENV === 'production' ? `https://gettogether.onrender.com/admin/${pollId}` : `http://localhost:3000/admin/${pollId}`;

  try {
    const message = {
      from: `<${GMAIL_user}>`,
      to: `<${email}>`,
      subject: 'Checkout',
      text: `Here are your GetTogether important links. To Share: ${sharedLink}. Link to edit: ${adminLink}`,
    };

    await transport.sendMail(message, (err) => {
      if (err) {
        console.log('Error Occured');
        console.log(err.message);
        return;
      }
      console.log('Message sent successfully');
    });

    res.json({ data: 'Email Successful' });
  } catch(err) {
    console.log(err);
    res.json({ data: 'Error Sending Email' });
  }
});

module.exports = router;