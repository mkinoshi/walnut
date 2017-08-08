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
import firebaseApp from '../../firebase';
import uuidv4 from 'uuid/v4';
import _ from 'underscore';
import Scroll from 'react-scroll';
import $ from 'jquery';


const scroll = Scroll.animateScroll;


class ModalInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: '',
      messages: []
    };
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom() {
    $('.scrolling').scrollTop(10000);
    console.log($('.scrolling'));
  }

  handleChange(e) {
    this.setState({commentBody: e.target.value});
  }

  handleClick(id) {
    const user = firebaseApp.auth().currentUser;
    const message = {
      author: user.email,
      content: this.state.commentBody,
      createdAt: new Date(),
      authorPhoto: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg'
    };
    const updates = {};
    const newMessageKey = firebaseApp.database().ref().child('messages').push().key;
    updates['/messages/' + id + '/' + newMessageKey] = message;
    firebaseApp.database().ref().update(updates);
    this.setState({commentBody: ''});
  }

  startListen(data) {
    this.scrollToBottom();
    if (data.postId) {
      const messagesRef = firebaseApp.database().ref('/messages/' + data.postId);
      messagesRef.on('value', (snapshot) => {
        if (snapshot.val()) {
          console.log('got it', snapshot.val(), typeof(snapshot.val()));
          this.setState({messages: _.values(snapshot.val())});
          this.scrollToBottom();
        } else {
          console.log('no snapshot val :(');
        }
      });
    } else {
      console.log('missing postData');
    }
  }
  render() {
    const self = this;
    return (
      <Modal onOpen={() => {this.startListen(this.props.postData);}} scrolling trigger={
        <div className="commentDiv" onClick={() => this.handleClick()}>
          <span className="commentNum">{this.props.postData.comments.length} </span>
          <Icon size="big" name="comments" className="commentIcon" />
        </div>}
        closeIcon="close"
        >
        <Modal.Header>
          <Post
            isOpen
            currentUser={this.props.currentUser}
            postData={this.props.postData}
            newLike={() => (this.props.newLike(this.props.postData.postId))} />
        </Modal.Header>
        <Modal.Content image scrolling className="scrollContentClass">
          {this.state.messages.map((message) => (
            <Modal.Description key={uuidv4()}>
              <Comment
                name={message.author}
                createdAt={message.createdAt}
                content={message.content}
                picture={message.authorPhoto}
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
  currentUser: PropTypes.object,
  startListen: PropTypes.func
};
const mapStateToProps = () => ({
});
const mapDispatchToProps = (dispatch) => ({
  newLike: (id) => newLikeThunk(id)(dispatch),
  newComment: (commentBody, postId) => newCommentThunk(commentBody, postId)(dispatch),
  newCommentLike: (postId, commentId) => newCommentLikeThunk(postId, commentId)(dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalInstance);
