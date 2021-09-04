const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const type = 'PostCreated';

  console.log('[event received] ', type);

  posts[id] = {
    id,
    title,
  };
  console.log('[event processet] ', type);

  await axios.post('http://localhost:4005/events', {
    type: type,
    data: {
      id,
      title,
    },
  });

  console.log('[event sent] ', type);

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('[event received] ', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('[posts up] Listening on port 4000');
});
