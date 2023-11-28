const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./api/router');
const Poll = require('../db/models/poll');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json())

const mongoDb = process.env.MONGO_URI;

mongoose.connect(mongoDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongo connection error'));

app.use(router);

app.delete('/admin/:pollUuid', async (req, res, next) => {
  try {
    await Poll.findByIdAndDelete({ _id: req.params.pollUuid }).then(data => data);
    res.status(200).json({ response: 'Successfully deleted poll data.' });
  } catch(err) {
    res.status(400).json({ response: 'Failure to delete poll.' });
  }
});


app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`)
});
