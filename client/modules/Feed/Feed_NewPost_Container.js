// dispatches NewPost

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagPrefContainer from './Feed_NewPost_TagPref_Container';
import newPostThunk from '../../thunks/post_thunks/newPostThunk';
import newTagThunk from '../../thunks/post_thunks/newTagThunk';
import ReactUploadFile from 'react-upload-file';
import { Icon, Button } from 'semantic-ui-react';
import superagent from 'superagent';
import './Feed.css';
import Textarea from 'react-textarea-autosize';

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
    this.props.newTag(tag);
    this.setState({postTags: this.state.postTags.concat([tag])});
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
      .field('name', this.state.newFileName ? this.state.newFileName : '')
      .field('useFilters', this.props.useFilters ? this.props.useFilters.map((tag) => tag._id) : [])
      .field('lastRefresh', this.props.lastRefresh)
      .attach('attach', this.state.file)
      .end((err, res) => {
        if (err) {
          console.log(err);
          alert('failed uploaded!');
        }
        this.props.clearPostTag();
        this.props.toggleModal();
        this.setState({postBody: '', file: '', newFileName: null});
        this.props.refreshDiscover(res.body.posts, res.body.lastRefresh);
      });
    } else {
      if (this.state.postBody && this.state.file === '') {
        this.props.newPost(this.state.postBody, this.props.postTags.map((tag) => tag._id), this.props.lastRefresh, this.props.useFilters);
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

  handleKeyPress(event) {
    if(event.key === 'Enter') {
      console.log('enter press here! ');
      console.log(event);
    }
  }

  handleRemove(tag) {
    this.props.handleRemove(tag);
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
          <Textarea id="textarea1"
            value={this.state.postBody}
            minRows={3}
            onChange={(e) => this.handleChange(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
            />
        </div>
        <div id="tagPrefTitleDiv"><h3 id="tagPrefTitleHash"># </h3><h4 id="tagPrefTitle"> add a topic</h4></div>
        <div className="row newPostTagsPref">
          <TagPrefContainer addTags={(tag) => (this.addTags(tag))}
                            addNewTags={(tag) => {this.addNewTags(tag);}}
                            tags={this.props.postTags}
                            handleRemove={(tag) => this.handleRemove(tag)} />
          {/* <NewTagContainer addToPost={(tag) => (this.addNewTags(tag))} /> */}
        </div>
          <div className="row newPostFooter">
          <div className="fileUpload col-xs-6">
            <ReactUploadFile
              style={{width: '80px', height: '40px'}}
              chooseFileButton={<Icon className="attachFileIcon" name="attach" size="large" />}
              options={optionsForUpload}/>
              {(this.state.file !== '') ?
              <input value={(this.state.newFileName !== null) ? this.state.newFileName : this.state.file.name}
              onChange={(e) => this.changeFileName(e.target.value)}/>
                :
                null}
            </div>
            <div className="col-xs-6">
              <Button onClick={() => this.submitPost()} animated>
                <Button.Content visible>create</Button.Content>
                <Button.Content hidden>
                  <Icon name="send"/>
                </Button.Content>
              </Button>
            </div>
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
  defaultFilters: PropTypes.array,
  postTags: PropTypes.array,
  addTag: PropTypes.func,
  handleRemove: PropTypes.func,
  clearPostTag: PropTypes.func,
  handleClose: PropTypes.func,
  toggleModal: PropTypes.func,
  useFilters: PropTypes.array
};

const mapStateToProps = (state) => ({
  lastRefresh: state.discoverReducer.lastRefresh,
  defaultFilters: state.discoverReducer.defaultFilters,
  postTags: state.postReducer.postTags,
  useFilters: state.discoverReducer.useFilters
});

const mapDispatchToProps = (dispatch) => ({
  refreshDiscover: (posts, lastRefresh) => dispatch({ type: 'GET_DISCOVER_DATA_REFRESH', posts: posts, lastRefresh: lastRefresh}),
  newPost: (postBody, postTags, lastRefresh, filter) => dispatch(newPostThunk(postBody, postTags, lastRefresh, filter)),
  newTag: (tag) => dispatch(newTagThunk(tag)),
  addTag: (tag) => dispatch({type: 'ADD_TAG', tag: tag}),
  handleRemove: (tag) => dispatch({type: 'DELETE_TAG', tag: tag}),
  clearPostTag: () => dispatch({type: 'CLEAR_POST_TAG'}),
  toggleModal: () => dispatch({type: 'MODAL_TOGGLE'})
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostContainer);
