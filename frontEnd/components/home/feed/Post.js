// comment button action renders modal
// ownprops being passed down too
// needs to have its own reducer because it
import React from 'react';
import {Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from './Modal';

// TODO on action of comment button dispatch modal

class Post extends React.Component {

  render() {
    return (
      <div>
        <h1>I am the post</h1>
      </div>
    );
  }
}

export default Post;
