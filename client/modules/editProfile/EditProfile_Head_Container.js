import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveBlurbThunk from '../../thunks/profile_thunks/saveBlurbThunk';
import saveTagsThunk from '../../thunks/profile_thunks/saveTagsThunk';
import ReactUploadFile from 'react-upload-file';
import superagent from 'superagent';
import Slider from 'react-slick';

const styles = {
  head: {
    backgroundColor: 'lightblue',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  profilePic: {
    height: '150px',
    width: '120px',
    float: 'left',
  },
  picture: {
    height: '105px',
    width: 'auto',
    marginLeft: '10px',
    marginTop: '10px',
  }
};

const defaulProfileUrl = 'https://s3-us-west-1.amazonaws.com/walnut-test/430-512.png';

class HeadContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      blurbInput: '',
      editTags: false,
      editBlurb: false
    };

    this.handleChangeBlurb = this.handleChangeBlurb.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.onSubmitBlurb = this.onSubmitBlurb.bind(this);
    this.toggleTags = this.toggleTags.bind(this);
    this.addTag = this.addTag.bind(this);
    this.saveTags = this.saveTags.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  handleChangeBlurb(event) {
    const input = event.target.value;
    this.setState({
      blurbInput: input,
    });
  }

  handleChangeTag(event) {
    const input = event.target.value;
    this.setState({
      tagInput: input,
    });
  }

  toggleBlurb() {
    this.setState({editBlurb: true});
  }

  onSubmitBlurb() {
    console.log('blurb', this.state.blurbInput);
    this.setState({editBlurb: false});
    // this.props.saveBlurb(this.state.blurbInput);
  }

  toggleTags() {
    this.setState({editTags: true, newTags: this.props.tags});
  }

  addTag(tag) {
    const tags = this.state.newTags;
    tags.push(tag);
    this.setState({newTags: tags, tagInput: ''});
  }

  removeTag(tag) {
    const tags = this.state.newTags;
    tags.splice(tags.indexOf(tag), 1);
    this.setState({newTags: tags});
  }

  saveTags(tags) {
    console.log('tags', tags);
    this.setState({editTags: false});
    this.props.saveTags(tags);
  }

  handleUpload(file) {
    console.log('inside handle file', file);
    this.setState({file: file});
  }

  saveImage() {
    console.log('in here save button');
    superagent.post('/aws/upload/profile')
    .attach('profile', this.state.file)
    .end((err, res) => {
      if (err) {
        console.log(err);
        alert('failed uploaded!');
      }
      console.log('response from aws save', res);
      this.setState({pic: res.body.pictureURL, file: {}});
    });
  }

  srcImg() {
    if(this.state.pic) {
      return this.state.pic;
    }
    if(this.props.pictureURL !== '') {
      return this.props.pictureURL;
    }
    return defaulProfileUrl;
  }

  render() {
    const optionsForUpload = {
      baseUrl: 'xxx',
      multiple: false,
      accept: 'image/*',
      didChoose: (files) => {
        console.log('this is the file', files[0]);
        this.handleUpload(files[0]);
      },
    };

    const img = this.srcImg();

    return (
      <div style={styles.head}>
        <div style={styles.profilePic}>
        <img style={styles.picture} src={img} />
          <ReactUploadFile
            style={{width: '80px', height: '40px'}}
            chooseFileButton={<button value="Change">Change</button>}
            options={optionsForUpload}/>
            {this.state.file ? <button value="save" onClick={() => {this.saveImage();}}>Upload</button> : <p></p>}
        </div>

        <h1>{this.props.fullName}</h1>
        <div>
          {this.state.editTags ?
              this.state.newTags.map((tag, idx)=> <div key={idx}>
                <p>#{' '}{tag}</p>
                <button value="X" onClick={() => {this.removeTag(tag);}}>X</button>
              </div>) :
              this.props.tags.map((tag, idx) => <p key={idx}>#{' '}{tag}</p>)}
          {this.state.editTags ? <div>
              <input type="text"
                     placeholder="Your new tag"
                     value={this.state.tagInput}
                     onChange={(e) => this.handleChangeTag(e)} />
            <button value="+" onClick={() => this.addTag(this.state.tagInput)}>+</button>
          </div>
              : null }
            {this.state.editTags ?
                <button onClick={() => this.saveTags(this.state.newTags)}>Save Tags</button> :
                <button value="Edit Tags" onClick={() => this.toggleTags()}>Edit Tags</button> }
        </div>
        {this.state.editBlurb ? <div>
          <input type="text"
                 placeholder="Enter blurb here"
                 value={this.state.blurbInput ? this.state.blurbInput : this.props.blurb}
                 onChange={(e) => this.handleChangeBlurb(e)}/>
          <button onClick={() => {this.onSubmitBlurb(this.state.blurbInput);}}>Save Blurb</button>
        </div> :
            <div>
              <p>{!!this.state.blurbInput ? this.state.blurbInput : this.props.blurb}</p>
          <button onClick={() => {this.toggleBlurb();}}>Edit Blurb</button></div> }
      </div>
    );
  }
}

HeadContainer.propTypes = {
  tags: PropTypes.array,
  blurb: PropTypes.string,
  fullName: PropTypes.string,
  saveBlurb: PropTypes.func,
  saveTags: PropTypes.func,
  pictureURL: PropTypes.string,
  userId: PropTypes.string,

};

const mapStateToProps = (state) => ({
  blurb: state.userReducer.blurb,
  tags: state.userReducer.tags,
  fullName: state.userReducer.fullName,
  pictureURL: state.userReducer.pictureURL,
  userId: state.userReducer._id
});

const mapDispatchToProps = (dispatch) => ({
  saveBlurb: (blurb) => saveBlurbThunk(blurb)(dispatch),
  saveTags: (tags) => saveTagsThunk(tags)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeadContainer);
