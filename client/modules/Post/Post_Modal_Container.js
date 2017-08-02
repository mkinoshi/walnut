import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import newLikeThunk from '../../thunks/post_thunks/newLikeThunk';
import newCommentThunk from '../../thunks/post_thunks/newCommentThunk';
import newCommentLikeThunk from '../../thunks/post_thunks/newCommentLikeThunk';
import Post from './Post_index';
import Comment from './Post_Comment';
import './Post.css';
import { Button, Header, Icon, Image, Modal, Card, Form, TextArea } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


class ModalInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: '',
    };
  }

  handleChange(e) {
    this.setState({commentBody: e.target.value});
  }

  handleClick(id) {
    this.props.newComment(this.state.commentBody, id);
    this.setState({commentBody: ''});
  }

  render() {
    return (
      <Modal scrolling trigger={
        <a className="commentButton">
          <span> <Icon name="comment outline" />
          {this.props.postData.comments.length} </span>
        </a>}
        closeIcon="close"
        >
        <Modal.Header>What goes here?</Modal.Header>
        <Modal.Content image scrolling className="scrollContentClass">
          <Modal.Description >
            <Post
            isOpen={true}
            currentUser={this.props.currentUser}
            postData={this.props.postData}
            newLike={() => (this.props.newLike(this.props.postData.postId))}/>
          </Modal.Description>
          {this.props.postData.comments.map((comment, ind) => (
            <Modal.Description key={ind}>
              <Comment
                newCommentLike={() => this.props.newCommentLike(this.props.postData.postId, comment.commentId)}
                username={comment.username}
                createdAt={comment.createdAt}
                content={comment.content}
                likes={comment.likes}
                currentUser={this.props.currentUser}
              />
            </Modal.Description>
            ))}
        </Modal.Content>
        <Modal.Actions>
          <span id="inputBoxHolder">
            <Form id="commentInput">
              <TextArea
                autoHeight
                placeholder="Give your two cents..." rows={1}
                value={this.state.commentBody}
                onChange={(e) => this.handleChange(e)}
              />
            </Form>
            <Button
              id="commentSubmit"
              primary
              onClick={() => this.handleClick(this.props.postData.postId)}>
              Comment
            </Button>
          </span>
        </Modal.Actions>
      </Modal>
    );
  }
}

ModalInstance.propTypes = {
  postData: PropTypes.object,
  newComment: PropTypes.func,
  onClick: PropTypes.func,
  newLike: PropTypes.func,
  newCommentLike: PropTypes.func,
  currentUser: PropTypes.object
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  newLike: (id) => newLikeThunk(id)(dispatch),
  newComment: (commentBody, postId) => newCommentThunk(commentBody, postId)(dispatch),
  newCommentLike: (postId, commentId) => newCommentLikeThunk(postId, commentId)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalInstance);
