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
// POTENTIAL BUG IN POST DATA BEING PASSED DOWN

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: '',
    };
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({commentBody: e.target.value});
  }

  handleClick(id) {
    console.log(id);
    this.props.newComment(this.state.commentBody, id);
    this.setState({commentBody: ''});
  }

  render() {
    console.log('it is here ', this.props.isOpen);
    const commentNum = this.props.postData.comments.length;
    return this.props.isOpen ? (
      <div>
        {this.props.postData.comments.map((comment) => (
          <div className="card blue-grey lighten-5" style={{marginTop: '45'}}>
            <div className="card-content black-text" style={{paddingTop: '0'}}>
              <img style={{height: '50', float: 'left'}}
                src="http://clubrunner.blob.core.windows.net/00000010115/PhotoAlbum/4-way-test-speech-contest-finals-2016/_87A1813.jpg"
                alt="5" className="circle"/>
              <div style={{marginLeft: '20'}}>
                <span className="card-title"
                  style={{float: 'left', paddingLeft: '30', fontSize: '20', fontWeight: 'bold'}}>
                  {comment.username}</span>
                <span className="card-title date" style={{float: 'right', fontSize: '10'}}>
                  {comment.createdAt.slice(11, 16)}</span>
              </div>
            </div>
            <p style={{clear: 'both', paddingLeft: '40', paddingTop: '10'}}>
              {comment.content}</p>
            <div className="card-action" style={{paddingBottom: '50'}}>
              <div>
                <a style={{backgroundColor: '#0D9ED3', float: 'left'}}
                  className="waves-effect waves-light btn"
                  onClick={() => (this.props.newLike)}><i
                    className="material-icons left">thumb_up</i>5</a>
              </div>
            </div>
          </div>
        ))}
        <div className="input-field col s8">
          <textarea id="textarea1" className="materialize-textarea"
            style={{'paddingTop': 0, 'paddingBottom': 0}}
            value={this.state.commentBody}
            onChange={(e) => this.handleChange(e)}></textarea>
          <label htmlFor="textarea1">Enter Your Comment</label>

        <button className="btn waves-effect waves-light" type="submit" name="action"
          onClick={() => this.handleClick(this.props.postData.postId)}>Submit
            <i className="material-icons right">send</i>
          </button>
        </div>
    </div>
    ) : (
      <div></div>
    );
  }
}

Modal.propTypes = {
  postData: PropTypes.object,
  newComment: PropTypes.func,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  newLike: PropTypes.func
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  newComment: (commentBody, postId) => dispatch(
    {type: 'NEW_COMMENT', commentBody: commentBody,
      postId: postId})
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
