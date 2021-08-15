const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// app.get('/posts/:id/comments', (req, res) => {
//   res.send(commentsByPostId[req.params.id] || []);
// });

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const type = 'CommentCreated';
  console.log('[event received] ', type);

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: 'pending' });
  commentsByPostId[req.params.id] = comments;
  console.log('[event processet] ', type);

  await axios.post('http://localhost:4005/events', {
    type: type,
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });
  console.log('[event sent] ', type);

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  let { type, data } = req.body;
  console.log('[event received] ', type);

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    console.log('[event processet] ', type);

    type = 'CommentUpdated';
    await axios.post('http://localhost:4005/events', {
      type: type,
      data: {
        id,
        status,
        postId,
        content,
      },
    });
    console.log('[event sent] ', type);
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('[comments up] Listening on port 4001');
});
