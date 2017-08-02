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

    // this.props.newComment(this.state.commentBody, id);
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
          {this.props.postData.comments.map((comment) => (
            <Modal.Description>
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

// render() {
//     return this.props.isOpen ? (
//       <div>
//         {/* Render each comment */}
//         {this.props.postData.comments.map((comment) => (
//           <div className="card" style={{marginTop: '45'}}>
//             <div className="card-block" style={{paddingTop: '0'}}>
//               <img style={{height: '50', float: 'left'}}
//                 src="http://clubrunner.blob.core.windows.net/00000010115/PhotoAlbum/4-way-test-speech-contest-finals-2016/_87A1813.jpg"
//                 alt="5" className="circle"/>
//               <div style={{marginLeft: '20'}}>
//                 <span className="card-title"
//                   style={{float: 'left', paddingLeft: '30', fontSize: '14', fontWeight: 'bold'}}>
//                   {comment.username}</span>
//                 <span className="card-title date" style={{float: 'right', fontSize: '10'}}>
//                   {comment.createdAt.slice(11, 16)}</span>
//               </div>
//             </div>
//             <p style={{clear: 'both', paddingLeft: '40', paddingTop: '10'}}>
//               {comment.content}</p>
//             <div className="card-action" style={{paddingBottom: '50'}}>
//               <div>
//                 <a style={{backgroundColor: '#0D9ED3', float: 'left'}}
//                   className="waves-effect waves-light btn"
//                   onClick={() => this.props.newCommentLike(this.props.postData.postId, comment.commentId)}><i
//                     className="material-icons left">thumb_up</i>{comment.likes.length}</a>
//               </div>
//             </div>
//           </div>
//         ))}
//       {/* Text area for typing in comment */}
//         <div className="input-field col s8">
//           <textarea id="textarea1" className="textarea"
//             style={{'paddingTop': 0, 'paddingBottom': 0}}
//             value={this.state.commentBody}
//             onChange={(e) => this.handleChange(e)}></textarea>
//           <label htmlFor="textarea1">  Enter Your Comment</label>

//         <button className="btn waves-effect waves-light" type="submit" name="action"
//           onClick={() => this.handleClick(this.props.postData.postId)}>Submit
//             <i className="material-icons right">send</i>
//           </button>
//         </div>
//     </div>
//     )
//     : (
//       <div></div>
//     );
//   }


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
