// dispatches NewPost

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// TODO input that takes in content of post with # dropdown selector
// input is string # is array
// TODO post button dispatches newPost
// userPost is the string that gets updated in reducer

class Filter extends React.Component {


  render() {
    console.log(this.props);
    return (
      <div>
        <text>NEWPOSTBOX</text>
      </div>
    );
  }
}

Filter.propTypes = {
  newPost: PropTypes.function
};

const mapStateToProps = (state) => ({
  userPost: state.newPostCommentReducer.post
});

const mapDispatchToProps = (dispatch) => ({
  onPostChange: (post) => dispatch({type: 'ONCHANGE_POST', post: post}),
  newPost: (postBody, tags) => dispatch({type: 'NEW_POST', tags: tags})
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
