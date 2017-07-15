// comment button action renders modal

import React from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';

// TODO on action of comment button dispatch modal
// TODO pass postData down

const Post = ({postData, newComment}) => {
  return (
    <div>
      <div>{postData.username}</div>
      <div>{postData.pictureURL}</div>
      <div>{postData.content}</div>
      <div>{postData.createdAt}</div>
      <div>{postData.tags.map(tag => (<text>#{tag} </text>))}</div>
      <div>{postData.likes}</div>
      <div>{postData.commentNumber}</div>
      <Modal postData={postData}/>
    </div>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
  newComment: PropTypes.func
};

export default Post;
