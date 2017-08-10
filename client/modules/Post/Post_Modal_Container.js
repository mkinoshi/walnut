import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import newLikeThunk from '../../thunks/post_thunks/newLikeThunk';
import newCommentThunk from '../../thunks/post_thunks/newCommentThunk';
import newCommentLikeThunk from '../../thunks/post_thunks/newCommentLikeThunk';
import Comment from './Post_Comment';
import './Post.css';
import { Button, Form, Icon, Image, Modal, Input, TextArea, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import firebaseApp from '../../firebase';
import uuidv4 from 'uuid/v4';
import _ from 'underscore';
import $ from 'jquery';
import NestedPostModal from './Nested_Post_Modal';
import InfiniteScroll from 'react-infinite-scroller';



class ModalInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: '',
      messages: [],
      hitBottom: false,
      c: 0,
    };
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    const membersRef = firebaseApp.database().ref('/members/' + this.props.postData.postId);
    membersRef.on('value', (snapshot) => {
      const peeps =  _.values(snapshot.val());
      const members = peeps.filter((peep) => peep);
      this.setState({members: members.length});
    });
    const countRef = firebaseApp.database().ref('/counts/' + this.props.postData.postId + '/count');
    countRef.on('value', (snapshot) => {
      this.setState({count: snapshot.val()});
    });
  }

  scrollToBottom(id) {
    // $('.scrolling').scrollTop(50000);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView();
      this.setState({hitBottom: true, c: this.state.c + 1});
    } else {
      console.log('elem missing');
      // $('.scrolling').scrollTop(100000);
      this.setState({hitBottom: true, c: this.state.c + 1});
    }
    // } else {
    //   const bottom = document.getElementById('bottom');
    //   console.log('bottom', bottom);
    //   bottom.scrollIntoView();
    // }
  }

  loadMore(data) {
    // const elmnt = document.getElementById(this.state.firstId);
    // console.log('first ID', this.state.firstId, elmnt);
    const oldId = this.state.firstId;
    if (this.state.hitBottom) {
      if (data.postId) {
        const messagesRef = firebaseApp.database().ref('/messages/' + data.postId).orderByKey()
                .endAt(this.state.firstKey).limitToLast(15);
        messagesRef.once('value', (snapshot) => {
          const newOnes = _.values(snapshot.val());
          newOnes.pop();
          const concat = newOnes.concat(this.state.messages);
          const more = newOnes.length > 0;
          const newId = (newOnes.length > 0) ? newOnes[0].authorId + '' + newOnes[0].content : '';
          this.setState({messages: concat, firstKey: Object.keys(snapshot.val())[0], firstId: newId, hitBottom: false, hasMore: more});
          // const scrollAmount = newOnes.length * 90 + 90;
          if (newId) {
            this.scrollToBottom(oldId);
          }
        });
      } else {
        console.log('missing postData load more');
      }
    } else {
      console.log('oops havent hit bottom yet :/');
    }
  }

  handleChange(e) {
    $('#messageInput').keypress( (event) => {
      if(event.which === 13) {
        this.handleClick(this.props.postData.postId);
        return false; // prevent duplicate submission
      }
      return null;
    });
    this.setState({commentBody: e.target.value});
  }

  handleClick(id) {
    if (this.state.commentBody.length > 0) {
      const user = firebaseApp.auth().currentUser;
      const commentBody = this.state.commentBody;
      const split = commentBody.split(' ');
      split.forEach((word, idx) => {
        if (word.length > 31) {
          const firstHalf = word.slice(0, 32);
          const secondHalf = word.slice(32);
          split[idx] = firstHalf + '\n' + secondHalf;
        }
      });
      const useBody = split.join(' ');
      const message = {
        author: user.displayName,
        authorId: user.uid,
        content: useBody,
        createdAt: new Date(),
        authorPhoto: this.props.currentUser.pictureURL
      };
      this.setState({commentBody: ''});
      const updates = {};
      const newMessageKey = firebaseApp.database().ref().child('messages').push().key;
      updates['/messages/' + id + '/' + newMessageKey] = message;
      firebaseApp.database().ref().update(updates);
      const messagesCountRef = firebaseApp.database().ref('/counts/' + this.props.postData.postId + '/count');
      messagesCountRef.transaction((currentValue) => {
        console.log('current count', currentValue);
        return (currentValue || 0) + 1;
      });
    }
  }

  startListen(data) {
    const updates = {};
    const user = firebaseApp.auth().currentUser;
    updates['/members/' + this.props.postData.postId + '/' + user.uid] = true;
    firebaseApp.database().ref().update(updates);

    if (data.postId) {
      const messagesRef = firebaseApp.database().ref('/messages/' + data.postId).orderByKey().limitToLast(20);
      messagesRef.on('value', (snapshot) => {
        if (snapshot.val()) {
          const send = _.values(snapshot.val());
          const ID = send[0].authorId + '' + send[0].content;
          const bottomID = send[send.length - 1].authorId + '' + send[send.length - 1].content;
          this.setState({messages: send, firstKey: Object.keys(snapshot.val())[0], firstId: ID, hasMore: true, hitBottom: true});
          if (this.state.c === 0 || send[send.length - 1].authorId === user.uid) {
            this.scrollToBottom(bottomID);
          }
        } else {
          console.log('no snapshot val :(');
        }
      });
    } else {
      console.log('missing postData');
    }
  }

  handleClose() {
    const updates = {};
    const user = firebaseApp.auth().currentUser;
    updates['/members/' + this.props.postData.postId + '/' + user.uid] = false;
    firebaseApp.database().ref().update(updates);
    this.setState({hitBottom: false, messages: [], firstKey: null, firstId: null, commentBody: '', c: 0});
  }

  render() {
    const self = this;
    return (
      <Modal onOpen={() => {this.startListen(this.props.postData);}}
             onClose={() => {this.handleClose();}}
             size={'small'}
             basic
             trigger={
        <div className="commentDiv">
          <span className="userNum">+{this.state.members > 0 ? this.state.members : ''}</span>
          <Icon size="big" name="users" className="users" />
          <span className="commentNum">+{this.state.count}</span>
          <Icon size="big" name="comments" className="commentIcon" />
        </div>}
        closeIcon="close"
        >
        <Modal.Header className="modalHeader">
          <NestedPostModal postData={this.props.postData}
                           currentUser={this.props.currentUser}/>
          <div className="inModalUsers">
            <span className="userNum">+{this.state.members > 0 ? this.state.members : ''}</span>
            <Icon size="big" name="users" className="users" color="grey" />
          </div>
        </Modal.Header>
        <Modal.Content scrolling className="scrollContentClass">
            <InfiniteScroll
                pageStart={0}
                loadMore={() => {this.loadMore(this.props.postData);}}
                hasMore={this.state.hasMore}
                isReverse
                threshold={25}
                loader={<Loader active inline="centered" />}
                useWindow={false}
            >
                {this.state.messages.map((message) => (
                      <Comment
                          id={message.authorId + '' + message.content}
                          key={uuidv4()}
                          name={message.author}
                          createdAt={message.createdAt}
                          content={message.content}
                          authorPhoto={message.authorPhoto}
                          currentUser={this.props.currentUser}
                          authorId={message.authorId}
                      />
                ))}
                <div id="bottom"></div>
            </InfiniteScroll>
        </Modal.Content>
        <Modal.Actions>
          <Form>
            <TextArea
              id="messageInput"
              autoHeight
              placeholder="Give your two cents..."
              value={this.state.commentBody}
              onChange={(e) => this.handleChange(e)}
              rows={3}
            />
          </Form>
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
