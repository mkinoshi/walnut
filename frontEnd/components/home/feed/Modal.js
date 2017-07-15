// needs to map comments and render comments
// render posts
// render newComm

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

// TODO import modal
// TODO newComment input and button that dispatches newComment
// userComment is the string that update input on new comment the
// newPostCommentReducerState is sent
// POTENTIAL BUG IN POST DATA BEING PASSED DOWN

class ModalInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: 'this is a test comment',
      modalState: false,
    };
  }

  render() {
    return (
      // <div>
      //   <a className="waves-effect waves-light btn" href="#modal1">I AM A MODAL!!!</a>
      //
      //   <div id="modal1" className="modal">
      //     <div className="modal-content">
      //       <h4>Modal Header</h4>
      //       <p>A bunch of text</p>
      //     </div>
      //     <div className="modal-footer">
      //       <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
      //     </div>
      //   </div>
      // </div>
      <Modal
        isOpen={this.state.modalState}
        contentLabel="Modal"
      />
      // <div>
      //   <h1>Post</h1>
      //   <div className="modalPost">
      //     <div>{this.props.postData.username}</div>
      //     <div>{this.props.postData.pictureURL}</div>
      //     <div>{this.props.postData.content}</div>
      //     <div>{this.props.postData.createdAt}</div>
      //     <div>{this.props.postData.tags.map(tag => (<text>#{tag} </text>))}</div>
      //     <div>{this.props.postData.likes}</div>
      //     <div>{this.props.postData.commentNumber}</div>
      //   </div>
      //   <h1>Comments</h1>
      //   {this.props.postData.comments.map((comment) => (
      //     <div className="modalComments">
      //       <div>{comment.username}</div>
      //       <div>{comment.pictureURL}</div>
      //       <div>{comment.content}</div>
      //       <div>{comment.createdAt}</div>
      //       <div>{comment.likes}</div>
      //     </div>
      //   ))}
      // </div>
    );
  }
}

ModalInstance.propTypes = {
  postData: PropTypes.object,
  newComment: PropTypes.func,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  newComment: (commentBody, postId) => dispatch(
    {type: 'NEW_COMMENT', commentBody: this.state.commentBody,
      postId: '59698f8f238cd990df7f5da4'})
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalInstance);
