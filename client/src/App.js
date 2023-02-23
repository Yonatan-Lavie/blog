import { Container } from '@mui/material';
import React from 'react';
import Navbar from './Navbar';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
  return (
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
      <Container style={{ display: 'flex' }}>
        <Navbar />
        <Container style={{ display: 'flex', flexDirection: 'column' }}>
          <PostCreate />
          <hr />
          <h1>Posts</h1>
          <PostList />
        </Container>
      </Container>
    </Container>
  );
};

export default App;
