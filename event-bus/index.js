const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// all system events
const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  console.log('[event received] ', req.body.type);
  // save event in events array
  events.push(event);
  console.log('[event add to array] ', req.body.type);

  axios.post('http://posts-clusterip-srv:4000/events', event);
  axios.post('http://comments-srv:4001/events', event);
  axios.post('http://query-srv:4002/events', event);
  axios.post('http://moderation-srv:4003/events', event);
  console.log('[event sent] ', req.body.type);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
  console.log('[all events sent] ', `events amount ${events.length}`);
});

app.listen(4005, () => {
  console.log('[event-bus up] Listening on port 4005');
});
