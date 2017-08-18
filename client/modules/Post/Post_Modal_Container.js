import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import newLikeThunk from '../../thunks/post_thunks/newLikeThunk';
import newCommentThunk from '../../thunks/post_thunks/newCommentThunk';
import newCommentLikeThunk from '../../thunks/post_thunks/newCommentLikeThunk';
import joinConversationThunk from '../../thunks/post_thunks/joinConversationThunk';
import Comment from './Post_Comment';
import './Post.css';
import { Form, Icon, Modal, TextArea, Loader, Button, Popup } from 'semantic-ui-react';
import firebaseApp from '../../firebase';
import uuidv4 from 'uuid/v4';
import _ from 'underscore';
import $ from 'jquery';
import NestedPostModal from './Nested_Post_Modal';
import InfiniteScroll from 'react-infinite-scroller';

const testers = [
  {
    typer: 'Eli Badgio',
    typerId: 'abcde',
    typerPhoto: 'https://s3-us-west-1.amazonaws.com/walnut-test/598b4634733b59030911d402Screen Shot 2017-07-31 at 12.31.45 AM.png1502299915152'
  },
  {
    typer: 'Alex Latif',
    typerId: 'fgfgfjgk',
    typerPhoto: 'https://s3-us-west-1.amazonaws.com/walnut-test/598b4634733b59030911d402Screen Shot 2017-07-31 at 12.31.45 AM.png1502299915152'
  }
];

class ModalInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: '',
      messages: [],
      typers: [],
      members: [],
      hitBottom: false,
      c: 0,
      unread: 0,
      // TODO conversation.filter((conv) => conv._id === this.props.postData._id).length > 0
      isInConversation: false
    };
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    const membersRef = firebaseApp.database().ref('/members/' + this.props.postData.postId);
    membersRef.on('value', (snapshot) => {
      const peeps =  _.values(snapshot.val());
      const members = peeps.filter((peep) => typeof (peep) === 'object');
      console.log('members mount', members);
      this.setState({membersCount: members.length, members: members});
    });
    const countRef = firebaseApp.database().ref('/counts/' + this.props.postData.postId + '/count');
    countRef.on('value', (snapshot) => {
      this.setState({count: snapshot.val()});
    });
    // notification stuff
    const updates = {};
    const userId = firebase.auth().currentUser.uid;
    firebaseApp.database().ref('/unreads/' + userId + '/' + this.props.postData.postId).on('value', snapshotB => {
      let unreadCount =  snapshotB.val();
      if (!isNaN(unreadCount)) {
        if (unreadCount > 0) {
          this.setState({unread: unreadCount});
          console.log('unread set to true');
        }
      }
    });
  }

  scrollToBottom(id) {
    // $('.scrolling').scrollTop(50000);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView();
      this.setState({hitBottom: true, c: this.state.c + 1});
    } else {
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
    if (e.target.value) {
      this.setState({commentBody: e.target.value});
    }
  }

  findEnter() {
    $('#messageInput').keypress( (event) => {
      if(event.which === 13) {
        this.handleClick(this.props.postData.postId);
        return false; // prevent duplicate submission
      }
      return null;
    });
  }

  handleClick(id) {
    const updates = {};
    updates['/typers/' + this.props.postData.postId + '/' + this.state.user.uid] = null;
    firebaseApp.database().ref().update(updates);
    if (this.state.commentBody.length > 0) {
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
        author: this.state.user.displayName,
        authorId: this.state.user.uid,
        content: useBody,
        createdAt: new Date(),
        authorPhoto: this.props.currentUser.pictureURL
      };
      // use follows, and subtract members (members is currently on)
      // notification stuff
      console.log('members array here', this.state.members);
      let temp = {};
      firebaseApp.database().ref('/followGroups/' + this.props.postData.postId).once('value', snapshot => {
        console.log('these people are following the post', snapshot.val());
        const followers = Object.keys(snapshot.val());
        const memberIds = this.state.members.map(member => member.uid);
        followers.forEach(follower => {
          // let unreadCount = firebaseApp.database().ref('/unreads/' + member.uid + '/' + this.props.postData.postId);
          console.log('got in here?', memberIds, follower, snapshot.val()[follower])
          if (snapshot.val()[follower] && !memberIds.includes(follower)) {
            firebaseApp.database().ref('/unreads/' + follower + '/' + this.props.postData.postId).once('value', snapshotB => {
              let unreadCount =  snapshotB.val();
              console.log('unreadCount', snapshotB.val());
              temp['/unreads/' + follower + '/' + this.props.postData.postId] = !isNaN(unreadCount) ? unreadCount + 1 : 1;
              firebaseApp.database().ref().update(temp);
            });
          }
        });
      })
      // notification stuff ends here
      this.setState({commentBody: '', prevBody: ''});
      const update = {};
      const newMessageKey = firebaseApp.database().ref().child('messages').push().key;
      update['/messages/' + id + '/' + newMessageKey] = message;
      firebaseApp.database().ref().update(update);
      const messagesCountRef = firebaseApp.database().ref('/counts/' + this.props.postData.postId + '/count');
      messagesCountRef.transaction((currentValue) => {
        return (currentValue || 0) + 1;
      });
    }
    const elem = document.getElementById('messageInput');
    elem.value = '';
  }

  startListen(data) {
    const updates = {};
    const user = firebaseApp.auth().currentUser;
    this.setState({user: user});
    const member = {
      name: user.displayName,
      avatar: this.props.currentUser.pictureURL,
      uid: user.uid
    };
    updates['/members/' + this.props.postData.postId + '/' + user.uid] = member;
    firebaseApp.database().ref().update(updates);
    // unread messages stuff
    firebaseApp.database().ref('/unreads/' + user.uid + '/' + this.props.postData.postId).set(0);
    this.setState({unread: 0});
    // unread stuff ends


    setInterval(() => {
      if (this.state.commentBody) {
        if (this.state.commentBody !== this.state.prevBody) {
          if (this.state.did === 0) {
            const updaters = {};
            const typeInfo = {
              typer: user.displayName,
              typerId: user.uid,
              typerPhoto: this.props.currentUser.pictureURL
            };
            updaters['/typers/' + this.props.postData.postId + '/' + user.uid] = typeInfo;
            firebaseApp.database().ref().update(updaters);
          }
          this.setState({prevBody: this.state.commentBody, did: 1});
        } else {
          const updatesEx = {};
          updatesEx['/typers/' + this.props.postData.postId + '/' + user.uid] = null;
          firebaseApp.database().ref().update(updatesEx);
          this.setState({did: 0});
        }
      }}, 300);

    if (data.postId) {
      const messagesRef = firebaseApp.database().ref('/messages/' + data.postId).orderByKey().limitToLast(20);
      messagesRef.on('value', (snapshot) => {
        if (snapshot.val()) {
          const send = _.values(snapshot.val());
          const ID = send[0].authorId + '' + send[0].content;
          const bottomID = send[send.length - 1].authorId + '' + send[send.length - 1].content;
          this.setState({messages: send,
              firstKey: Object.keys(snapshot.val())[0],
              firstId: ID,
              hasMore: true,
              hitBottom: true});
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

  watchForTypers() {
    const user = firebaseApp.auth().currentUser;
    const typersRef = firebaseApp.database().ref('/typers' + '/' + this.props.postData.postId);
    typersRef.on('value', (snapshot) => {
      if (snapshot.val()) {
        const pairs = _.pairs(snapshot.val());
        const typers = pairs.filter((pair) => pair[1])
            .map((typer) => typer[1])
            .filter((obj) => obj.typerId !== user.uid);
        this.setState({typers: typers});
      } else {
        this.setState({typers: []});
      }
    });
  }

  handleClose() {
    const updates = {};
    updates['/members/' + this.props.postData.postId + '/' + this.state.user.uid] = null;
    firebaseApp.database().ref().update(updates);

    const updatesEx = {};
    updatesEx['/typers/' + this.props.postData.postId + '/' + this.state.user.uid] = null;
    firebaseApp.database().ref().update(updatesEx);

    this.setState({hitBottom: false, messages: [], firstKey: null, firstId: null, commentBody: '', prevBody: '', did: 0, c: 0});
  }

  joinConversation() {
    const updates = {};
    updates['/follows/' + this.state.user.uid + '/' + this.props.currentUser.currentCommunity._id + '/' + this.props.postData.postId] = true;
    updates['/followGroups/' + this.props.postData.postId + '/' + this.state.user.uid] = true;
    firebaseApp.database().ref().update(updates);
  }

  leaveConversation() {
    const updates = {};
    updates['/follows/' + this.state.user.uid + '/' + this.props.currentUser.currentCommunity._id + '/' + this.props.postData.postId] = false;
    updates['/followGroups/' + this.props.postData.postId + '/' + this.state.user.uid] = false;
    firebaseApp.database().ref().update(updates);
  }

  render() {
    return (
      <Modal onOpen={() => {this.startListen(this.props.postData); this.watchForTypers();}}
             onClose={() => {this.handleClose();}}
             size={'small'}
             basic
             trigger={this.state.unread > 0 ? 
        <div className="commentDiv" style={{color: 'red'}}>{this.state.unread} unread</div>
        :
        <div className="commentDiv">
          <span className="userNum">{this.state.membersCount > 0 ? this.state.membersCount : ''}</span>
          <Icon size="big" name="users" className="users" />
          <span className="commentNum">{this.state.count}</span>
          <Icon size="big" name="comments" className="commentIcon" />
        </div>}
        closeIcon="close"
        >
        <Modal.Header className="modalHeader">
          <NestedPostModal postData={this.props.postData}
                           currentUser={this.props.currentUser}/>
          <Popup
            className="membersPopup"
            trigger={ <div className="inModalUsers">
              <span className="userNum">{this.state.membersCount > 0 ? this.state.membersCount : ''}</span>
              <Icon size="big" name="users" className="users" color="grey" />
            </div>}
            content={<div>{this.state.members.map((member) => <div className="imageWrapper messageAvatarOther popupAvatar">
              <img className="postUserImage" src={member.avatar} />
            </div>)}</div>}
            position="right center"
            inverted
            hoverable
            size={'small'}
          />
          {this.props.myConvoIds.indexOf(this.props.postData.postId) > -1 ?
          <div className="joinConversation">
            <Button
                onClick={() => this.leaveConversation()}
                circular
                id="leaveButton"
                animated="vertical">
              <Button.Content>unFollow</Button.Content>
            </Button>
          </div> :
            <div className="joinConversation">
              <Button
                onClick={() => this.joinConversation()}
                circular
                id="joinButton"
                animated="vertical">
                <Button.Content hidden>Follow</Button.Content>
                <Button.Content visible>
                  <Icon name="plus" />
                </Button.Content>
              </Button>
            </div>
          }
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
            </InfiniteScroll>
            <Modal.Description className="typersContainer">
                {this.state.typers.map((typer) =>
                    <div key={uuidv4()} className="typerGroup">
                      <Popup
                          trigger= {<div className="imageWrapper messageAvatarOther typingImage">
                            <img className="postUserImage" src={typer.typerPhoto} />
                          </div>}
                          content={typer.typer}
                          position="left center"
                          inverted
                      />
                      <Icon className="typingIcon" name="ellipsis horizontal" size="big"/>
                    </div>
                )}
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions className="modalActions">
          <Form className="textBoxForm">
            <TextArea
              id="messageInput"
              autoHeight
              placeholder="Give your two cents..."
              onChange={(e) => {this.handleChange(e); this.findEnter();}}
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
  startListen: PropTypes.func,
  joinConversation: PropTypes.func,
  myConvoIds: PropTypes.array
};
const mapStateToProps = (state) => ({
  myConvoIds: state.conversationReducer.iDs,
});
const mapDispatchToProps = (dispatch) => ({
  newLike: (id) => newLikeThunk(id)(dispatch),
  joinConversation: (postId) => dispatch(joinConversationThunk(postId)),
  newComment: (commentBody, postId) => newCommentThunk(commentBody, postId)(dispatch),
  newCommentLike: (postId, commentId) => newCommentLikeThunk(postId, commentId)(dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalInstance);
