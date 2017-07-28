import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import newLikeThunk from '../../thunks/post_thunks/newLikeThunk';
import newCommentThunk from '../../thunks/post_thunks/newCommentThunk';
import newCommentLikeThunk from '../../thunks/post_thunks/newCommentLikeThunk';
import Post from './Post_index';
import './Post.css';
import { Button, Header, Icon, Image, Modal, Card } from 'semantic-ui-react';
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
        </a>}>
        <Modal.Header>What goes here?</Modal.Header>
        <Modal.Content image className="scroll">
          <Modal.Description >
            <Post className="post"
            currentUser={this.props.currentUser}
            postData={this.props.postData}
            newLike={() => (this.props.newLike(this.props.postData.postId))}/>
          </Modal.Description>
          {this.props.postData.comments.map((comment) => (
            <Card className="commentWidth">
              <Card.Content >
                <Image floated="left" size="mini" src="http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg" />
                  <Card.Header>
                    {comment.username}
                  </Card.Header>
                  <Card.Meta>
                    {comment.createdAt.slice(11, 16)}
                  </Card.Meta>
                  <Card.Description>
                    {comment.content}
                  </Card.Description>
                  <a onClick={() => this.props.newCommentLike(this.props.postData.postId, comment.commentId)}>
                    <Icon name="thumbs outline up" />
                    {comment.likes.length}
                  </a>
              </Card.Content>
            </Card>
            ))}
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name="right chevron" />
          </Button>
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
