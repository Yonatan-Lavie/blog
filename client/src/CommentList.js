import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MessageIcon from '@mui/icons-material/Message';

import { deepOrange, green } from '@mui/material/colors';

import React from 'react';

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === 'approved') {
      content = comment.content;
    }
    if (comment.status === 'pending') {
      content = 'This comment is awaiting moderation';
    }
    if (comment.status === 'rejected') {
      content = 'This comment has been rejected';
    }

    return (
      <ListItem alignItems="flex-start" key={comment.id}>
        <ListItemAvatar>
          <Avatar
            sx={{ bgcolor: green[300], width: 24, height: 24 }}
            variant="rounded"
          >
            <MessageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText secondary={<React.Fragment>{content}</React.Fragment>} />
      </ListItem>
    );
  });

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {renderedComments}
    </List>
  );
};

export default CommentList;
