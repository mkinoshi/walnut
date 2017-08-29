// dispatches NewPost

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagPrefContainer from './Feed_NewPost_TagPref_Container';
import newPostThunk from '../../thunks/post_thunks/newPostThunk';
import newTagThunk from '../../thunks/post_thunks/newTagThunk';
import ReactUploadFile from 'react-upload-file';
import { Icon, Button, TextArea, Form, Divider } from 'semantic-ui-react';
import superagent from 'superagent';
import './Feed.css';

// TODO input that takes in content of post with # dropdown selector
// input is string # is array
// TODO post button dispatches newPost
// userPost is the string that gets updated in reducer


class NewPostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postBody: '',
      newFileName: null,
      file: ''
    };
  }

  addTags(tag) {
    if (this.props.postTags.filter((t) => t._id === tag._id).length === 0) {
      this.props.addTag(tag);
    }
  }

  addNewTags(tag) {
    if (this.props.postTags.filter((t) => t.name === tag).length === 0 &&
        this.props.newPostTags.filter((t) => t === tag).length === 0) {
      this.props.newTag(tag);
    }
    // this.setState({postTags: this.state.postTags.concat([tag])});
  }

  // removeTag(tag) {
  //   const newTagsCopy = this.state.newTags.slice();
  //   newTagsCopy.splice(newTagsCopy.indexOf(tag), 1);
  //   this.setState({newTags: newTagsCopy});
  // }

  handleChange(e) {
    this.setState({postBody: e.target.value});
  }

  submitPost() {
    if (this.state.file !== '') {
      superagent.post('/aws/upload/post')
      .field('body', this.state.postBody ? this.state.postBody : '')
      .field('tags', this.props.postTags ? this.props.postTags.map((tag) => tag._id) : [])
      .field('useFilters', this.props.useFilters ? this.props.useFilters.map((tag) => tag._id) : [])
      .field('newTags', this.props.newPostTags ? this.props.newPostTags : [])
      .field('name', this.state.newFileName ? this.state.newFileName : '')
      .field('lastRefresh', this.props.lastRefresh)
      .attach('attach', this.state.file)
      .end((err, res) => {
        if (err) {
          console.log(err);
          alert('failed uploaded!');
        }
        this.props.clearPostTag();
        const elem = document.getElementById('textarea1');
        elem.value = '';
        this.setState({postBody: '', file: '', newFileName: null});
        // TODO: dispatch front end refresh no backend call
        this.props.refreshDiscover(res.body.posts, res.body.lastRefresh);
      });
    } else {
      if (this.state.postBody && this.state.file === '') {
        this.props.newPost(this.state.postBody, this.props.postTags.map((tag) => tag._id), this.props.newPostTags, this.props.lastRefresh, this.props.useFilters);
        const elem = document.getElementById('textarea1');
        elem.value = '';
        this.setState({ postBody: '', file: ''});
        this.props.clearPostTag();
      } else {
        alert('Oops, post is empty');
      }
    }
    // this.props.handleClose();
  }

  handleUpload(file) {
    console.log(file);
    this.setState({file: file});
  }

  changeFileName(name) {
    this.setState({newFileName: name});
  }

  handleRemove(tag) {
    if (typeof tag === 'string') {
      this.props.handleNewRemove(tag);
    } else {
      this.props.handleRemove(tag);
    }
  }

  render() {
    const optionsForUpload = {
      baseUrl: 'xxx',
      multiple: false,
      didChoose: (files) => {
        this.handleUpload(files[0]);
      },
    };
    return (
      <div className="newPost">
        <div className="row newPostContent">
          <Form className="newPostForm">
            <TextArea
              id="textarea1"
              autoHeight
              placeholder="What's on your mind?"
              minRows={2}
              onChange={(e) => this.handleChange(e)}
              />
          </Form>
        </div>
        <div className="row newPostTagsPref">
          <TagPrefContainer addTags={(tag) => (this.addTags(tag))}
                            addNewTags={(tag) => {this.addNewTags(tag);}}
                            tags={this.props.postTags}
                            newtags={this.props.newPostTags}
                            handleRemove={(tag) => this.handleRemove(tag)} />
        </div>
          <Divider />
          <div className="row newPostFooter">
            <ReactUploadFile
              className="fileUpload"
              style={{width: '80px', height: '40px'}}
              chooseFileButton={<Icon className="attachFileIcon" name="attach" size="large" />}
              options={optionsForUpload}/>
              {(this.state.file !== '') ?
              <input value={(this.state.newFileName !== null) ? this.state.newFileName : this.state.file.name}
              onChange={(e) => this.changeFileName(e.target.value)}/>
                :
                null}
              <Button className="wholeCreateButton" onClick={() => this.submitPost()} animated>
                <Button.Content className="createButton" visible>Create</Button.Content>
                <Button.Content className="createButton" hidden>
                  <Icon name="send" />
                </Button.Content>
              </Button>
          </div>
      </div>
    );
  }
}

NewPostContainer.propTypes = {
  newPost: PropTypes.func,
  newTag: PropTypes.func,
  refreshDiscover: PropTypes.func,
  lastRefresh: PropTypes.string,
  otherTags: PropTypes.array,
  postTags: PropTypes.array,
  addTag: PropTypes.func,
  handleRemove: PropTypes.func,
  clearPostTag: PropTypes.func,
  handleClose: PropTypes.func,
  toggleModal: PropTypes.func,
  useFilters: PropTypes.array,
  newPostTags: PropTypes.array,
  handleNewRemove: PropTypes.func
};

const mapStateToProps = (state) => ({
  lastRefresh: state.discoverReducer.lastRefresh,
  otherTags: state.discoverReducer.otherTags,
  postTags: state.postReducer.postTags,
  useFilters: state.discoverReducer.useFilters,
  newPostTags: state.postReducer.newPostTags
});

const mapDispatchToProps = (dispatch) => ({
  refreshDiscover: (posts, lastRefresh) => dispatch({ type: 'GET_DISCOVER_DATA_REFRESH', posts: posts, lastRefresh: lastRefresh}),
  newPost: (postBody, postTags, newTags, lastRefresh, filter) => dispatch(newPostThunk(postBody, postTags, newTags, lastRefresh, filter)),
  newTag: (tag) => dispatch({type: 'ADD_NEW_TAG', tag: tag}),
  addTag: (tag) => dispatch({type: 'ADD_TAG', tag: tag}),
  handleRemove: (tag) => dispatch({type: 'DELETE_TAG', tag: tag}),
  handleNewRemove: (tag) => dispatch({type: 'DELETE_NEW_TAG', tag: tag}),
  clearPostTag: () => dispatch({type: 'CLEAR_POST_TAG'}),
  toggleModal: () => dispatch({type: 'MODAL_TOGGLE'})
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostContainer);
