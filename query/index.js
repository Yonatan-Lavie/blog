const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  switch (type) {
    case 'PostCreated': {
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    }
    case 'CommentCreated': {
      const { id, content, postId, status } = data;
      const post = posts[postId];
      post.comments.push({ id, content, status });
      break;
    }
    case 'CommentUpdated': {
      const { id, content, postId, status } = data;
      const post = posts[postId];
      const comment = post.comments.find((comment) => comment.id === id);
      comment.status = status;
      comment.content = content;
      break;
    }
    default:
      break;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
  console.log(
    '[data sent] ',
    `all posts, amount: ${Object.keys(posts).length}`
  );
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log('[event received] ', type);

  handleEvent(type, data);
  console.log('[event processet] ', type);

  res.send({});
});

app.listen(4002, async () => {
  console.log('[query up] Listening on port 4002');
  // retriveing and handling all previos events from event bus.
  const res = await axios.get('http://localhost:4005/events');
  const events = res.data;
  console.log('[all events sent] ', `events amount ${events.length}`);

  for (let event of events) {
    handleEvent(event.type, event.data);
    console.log('[event processet] ', event.type);
  }
});
