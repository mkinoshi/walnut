// dispatches NewPost

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// TODO input that takes in content of post with # dropdown selector
// input is string # is array
// TODO post button dispatches newPost
// userPost is the string that gets updated in reducer

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postBody: 'test',
      postTags: ['technology', 'marketing']
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <text>NEWPOSTBOX</text>
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
  newPost: (postBody, tags) => dispatch(
    {type: 'NEW_POST', postTags: this.state.postTags, postBody: this.state.postBody})
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
