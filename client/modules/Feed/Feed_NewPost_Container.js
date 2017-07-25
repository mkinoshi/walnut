// dispatches NewPost

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagPrefContainer from './Feed_NewPost_TagPref_Container';
import NewTagContainer from './Feed_NewPost_NewTag_Container';
import newPostThunk from '../../thunks/post_thunks/newPostThunk';

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
    backgroundColor: '#0D9ED3',
    width: '50%',
    marginLeft: '25%'
  },
  post: {
    backgroundColor: 'white',
    borderRadius: '5px',
  }
};

class NewPostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postBody: '',
      postTags: [],
      showTagPref: false,
      showNewTag: false
    };
  }

  addTags(tag) {
    const postTagsCopy = this.state.postTags.slice();
    if(postTagsCopy.includes(tag)) {
      const index = postTagsCopy.indexOf(tag);
      postTagsCopy.splice(index, 1);
      this.setState({postTags: postTagsCopy});
    } else {
      postTagsCopy.push(tag);
      this.setState({postTags: postTagsCopy});
    }
  }

  toggleNewTag() {
    this.setState({showNewTag: !this.state.showNewTag});
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
                <div>
                  <TagPrefContainer addTags={(tagsArray) => (this.addTags(tagsArray))}
                    tags={this.state.postTags}/>
                  <NewTagContainer />
                </div>
                 : <p></p>}
            </div>
            {/* <div className="newTags">
              <div className="newTagsButton" style={{}}>
                <a style={{backgroundColor: '#FF5657'}}
                  className="waves-effect waves-light btn"
                  onClick={() => (this.toggleNewTag())}>New Tags</a>
              </div>
              {this.state.showNewTag ?
                // <TagPref addTags={(tagsArray) => (this.addTags(tagsArray))}
                // tags={this.state.postTags}/>
                <NewTagContainer />
                : <p></p>}
            </div> */}
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

NewPostContainer.propTypes = {
  newPost: PropTypes.func
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  newPost: (postBody, postTags) => newPostThunk(postBody, postTags)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostContainer);
