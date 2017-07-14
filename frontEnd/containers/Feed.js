// maps through posts and renders Post
// connect
import React from 'react';
import { connect } from 'react-redux';
import Post from '../components/home/feed/Post';


// TODO map through redux post array and render post Component

class Feed extends React.Component {

  render() {
    return (
      <div>
        <h1>I am the feed</h1>
        <Post />
      </div>
    );
  }
}

export default Feed;
