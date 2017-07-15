// needs to map comments and render comments
// render posts
// render newComm

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// TODO import modal
// TODO newComment input and button that dispatches newComment
// userComment is the string that update input on new comment the
// newPostCommentReducerState is sent

const Modal = ({newComment, postData, userComment}) => {
  return (
    <div>
      <h1>Post</h1>
      <div className="modalPost">
        <div>{postData.username}</div>
        <div>{postData.pictureURL}</div>
        <div>{postData.content}</div>
        <div>{postData.createdAt}</div>
        <div>{postData.tags.map(tag => (<text>#{tag} </text>))}</div>
        <div>{postData.likes}</div>
        <div>{postData.commentNumber}</div>
      </div>
      <h1>Comments</h1>
      {postData.comments.map((comment) => (
        <div className="modalComments">
          <div>{comment.username}</div>
          <div>{comment.pictureURL}</div>
          <div>{comment.content}</div>
          <div>{comment.createdAt}</div>
          <div>{comment.likes}</div>
        </div>
      ))}
    </div>
  );
};

Modal.propTypes = {
  postData: PropTypes.object,
  newComment: PropTypes.func,
  userComment: PropTypes.string
};

const mapStateToProps = (state) => ({
  userComment: state.newPostCommentReducer.comment
});

const mapDispatchToProps = (dispatch) => ({
  onCommentChange: (comment) => dispatch({type: 'ONCHANGE_STRING', comment: comment}),
  newComment: (commentBody, postId) => dispatch({type: 'NEW_COMMENT', postId: postId})
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
