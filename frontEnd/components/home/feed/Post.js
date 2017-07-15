// comment button action renders modal

import React from 'react';
import PropTypes from 'prop-types';
import ModalInstance from './Modal';

// TODO on action of comment button dispatch modal
// TODO pass postData down

const Post = ({postData, newComment}) => {
  console.log(ModalInstance);
  return (
    <div>
      <div>{postData.username}</div>
      <div>{postData.pictureURL}</div>
      <div>{postData.content}</div>
      <div>{postData.createdAt}</div>
      <div>{postData.tags.map(tag => (<text>#{tag} </text>))}</div>
      <div>{postData.likes}</div>
      <div>{postData.commentNumber}</div>
      {/* <ModalInstance postData={postData}/> */}
    </div>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
  newComment: PropTypes.func
};

export default Post;
