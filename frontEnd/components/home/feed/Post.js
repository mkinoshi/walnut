// comment button action renders modal

import React from 'react';
// import Modal from './Modal';
import PropTypes from 'prop-types';

// TODO on action of comment button dispatch modal

const Post = ({postData}) => {
  console.log('here');
  return (
    <div>
      <div>{postData.username}</div>
      <div>{postData.pictureURL}</div>
      <div>{postData.content}</div>
      <div>{postData.createdAt}</div>
      <div>{postData.tags.map(tag => (<text>#{tag} </text>))}</div>
      <div>{postData.likes}</div>
      <div>{postData.commentNumber}</div>
    </div>
  );
};

Post.propTypes = {
  postData: PropTypes.object
};

export default Post;
