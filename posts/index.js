const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// app.get('/posts', (req, res) => {
//   res.send(posts);
// });

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title, auther, content } = req.body;
  const type = 'PostCreated';

  console.log('[event received] ', type);

  const newPost = {
    id,
    title,
    auther,
    content,
    likes: 0,
    views: 0,
  };
  posts[newPost.id] = newPost;
  console.log('[event processet] ', type);

  await axios.post('http://event-bus-srv:4005/events', {
    type: type,
    data: { ...newPost },
  });

  console.log('[event sent] ', type);

  res.status(201).send(posts[id]);
});

app.post('/posts/like', async (req, res) => {
  const { id } = req.body;
  const type = 'PostUpdated';

  console.log('[event received] ', type);

  posts[id].likes += 1;
  console.log('[event processet] ', type);

  await axios.post('http://event-bus-srv:4005/events', {
    type: type,
    data: { ...posts[id] },
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
