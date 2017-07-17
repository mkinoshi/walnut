// dispatches NewPost

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagPref from './TagPref';

// TODO input that takes in content of post with # dropdown selector
// input is string # is array
// TODO post button dispatches newPost
// userPost is the string that gets updated in reducer

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
      <div className="newPost col-xs-8">
        <label htmlFor="textarea1">Enter Your Post</label>
        <textarea id="textarea1" className="materialize-textarea"
          style={{'paddingTop': 0, 'paddingBottom': 0}}
          value={this.state.postBody}
          onChange={(e) => this.handleChange(e)}></textarea>

        <div className="newPostFooter">
          <div className="submitButton col-xs-4">
            <button className="btn waves-effect waves-light" type="submit" name="action"
            onClick={() => this.handleClick()}>Submit
              <i className="material-icons right">send</i>
            </button>
          </div>

          <div className="tagsPref">
            <div className="addTagsButton" style={{}}>
              <a style={{backgroundColor: '#FF5657'}}
                className="waves-effect waves-light btn"
                onClick={() => (this.toggleTagPref())}>Add Tags</a>
            </div>
            {this.state.showTagPref ?
              <TagPref addTags={(tagsArray) => (this.addTags(tagsArray))}/> : <p></p>}
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
