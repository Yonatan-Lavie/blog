import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Stack,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });
    setLoading(false);
    setContent('');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Stack
          justifyContent={'space-between'}
          alignItems={'center'}
          direction="row"
        >
          <TextField
            fullWidth
            size="small"
            multiline={true}
            label="write comment"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            margin="normal"
            required
          />

          <IconButton
            onClick={() => setContent('')}
            aria-label="delete"
            size="medium"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          {loading ? (
            <LoadingButton
              iconSizeMedium
              loading={loading}
              loadingPosition="center"
            />
          ) : (
            <IconButton type="submit" aria-label="send" size="medium">
              <SendIcon fontSize="inherit" />
            </IconButton>
          )}
        </Stack>
      </form>
    </div>
  );
};

export default CommentCreate;
