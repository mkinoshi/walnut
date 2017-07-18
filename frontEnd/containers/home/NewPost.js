// dispatches NewPost

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagPref from './TagPref';

// TODO input that takes in content of post with # dropdown selector
// input is string # is array
// TODO post button dispatches newPost
// userPost is the string that gets updated in reducer

const styles = {
  postOuter: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#0D9ED3'
  },
  outer: {
    paddingTop: '1%',
    paddingLeft: '1%',
    paddingRight: '1%',
    paddingBottom: '1%',
    backgroundColor: '#0D9ED3'
  },
  post: {
    backgroundColor: 'white',
    borderRadius: '5px',

  }
};

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postBody: '',
      postTags: [],
      showTagPref: false
    };
  }

  addTags(tagsArray) {
    this.setState({postTags: tagsArray});
  }

  toggleTagPref() {
    this.setState({showTagPref: !this.state.showTagPref});
  }

  handleChange(e) {
    this.setState({postBody: e.target.value});
  }

  handleClick() {
    this.props.newPost(this.state.postBody, this.state.postTags);
    this.setState({postBody: '', postTags: [], showTagPref: false});
  }

  render() {
    console.log(this.props);
    return (
      <div className="col-xs-6 col-xs-offset-3" style={styles.outer}>
        <div className="newPost" style={styles.post}>
          <textarea id="textarea1"
            style={{'paddingTop': 0, 'paddingBottom': 0, borderWidth: 0, height: '80px'}}
            value={this.state.postBody}
            onChange={(e) => this.handleChange(e)}>
              <label htmlFor="textarea1">Enter Your Post</label>
            </textarea>
        </div>
          <div style={styles.postOuter}>
            <div className="tagsPref">
              <div className="addTagsButton" style={{}}>
                <a style={{backgroundColor: '#FF5657'}}
                  className="waves-effect waves-light btn"
                  onClick={() => (this.toggleTagPref())}>Add Tags</a>
              </div>
              {this.state.showTagPref ?
                <TagPref addTags={(tagsArray) => (this.addTags(tagsArray))}/> : <p></p>}
            </div>

            <div className="newPostFooter">
              <div className="submitButton col-xs-12">
                <button className="btn waves-effect waves-light" type="submit" name="action"
                onClick={() => this.handleClick()}>Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
          </div>
          </div>
      </div>
    );
  }
}

NewPost.propTypes = {
  newPost: PropTypes.function
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  newPost: (postBody, postTags) => dispatch(
    {type: 'NEW_POST', postTags: postTags, postBody: postBody})
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
