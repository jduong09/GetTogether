const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./api/router');
const Poll = require('../db/models/poll');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`)
});

const mongoDb = process.env.PROD === 'false' ? process.env.MONGO_TEST_URI : process.env.MONGO_PROD_URI;

mongoose.connect(mongoDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongo connection error'));

app.use(router);

app.delete('/admin/:pollUuid', async (req, res, next) => {
  try {
    await Poll.findByIdAndDelete({ _id: req.params.pollUuid });
    res.status(200).json({ response: 'Successfully deleted poll data.' });
  } catch(err) {
    res.status(400).json({ response: 'Failure to delete poll.' });
  }
});

/** 
 * @description Serve static files from express backend.
*/

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.normalize('../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.normalize('../client/build/index.html'));
  });
}