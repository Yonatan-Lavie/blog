import React, { useState } from 'react';
import {
  Container,
  TextField,
  FormGroup,
  Button,
  FormLabel,
  Stack,
} from '@mui/material';

// import { SendIcon, DeleteIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';

import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [auther, setAuther] = useState('');
  const [content, setContent] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://posts.com/posts/create', {
      title,
      auther,
      content,
    });
    setTitle('');
    setAuther('');
    setContent('');
  };
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <FormGroup onSubmit={onSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="auther"
            value={auther}
            onChange={(event) => setAuther(event.target.value)}
            margin="normal"
            required
          />
          <TextField
            multiline={true}
            minRows={4}
            label="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            margin="normal"
            required
          />

          <Stack justifyContent={'flex-end'} direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Publish Post
            </Button>
          </Stack>
        </FormGroup>
      </form>
    </Container>
  );
};

export default PostCreate;
