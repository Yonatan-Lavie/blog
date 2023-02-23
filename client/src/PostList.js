import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
// MUI components
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageIcon from '@mui/icons-material/Message';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostList = () => {
  const [posts, setPosts] = useState({});
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const fetchPosts = async () => {
    const res = await axios.get('http://posts.com/posts');
    setPosts(res.data);
  };

  const handleLikeClick = async (id) => {
    const res = await axios.post('http://posts.com/posts/like', {
      id,
    });
    fetchPosts();
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div>
        <Card sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <CardHeader
            avatar={
              <Avatar alt={post.auther} src="/static/images/avatar/1.jpg" />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={post.title}
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon onClick={() => handleLikeClick(post.id)} />
              <Typography>{post.likes}</Typography>
            </IconButton>
            <IconButton aria-label="add to favorites">
              <MessageIcon />
              <Typography>{post.comments.length}</Typography>
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <CommentCreate postId={post.id} />
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <CommentList comments={post.comments} />
            </CardContent>
          </Collapse>
        </Card>
        {/* <Divider variant="inset" /> */}
      </div>
    );
  });
  return <div>{renderedPosts}</div>;
};

export default PostList;
