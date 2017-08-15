/**
 * Created by ebadgio on 8/10/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Label, Input, Modal, Button, Icon } from 'semantic-ui-react';
import ReactUploadFile from 'react-upload-file';
import superagent from 'superagent';

class EditCommunityModal extends React.Component {
  constructor() {
    super();
    this.state = {
      titleValue: '',
      image: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
      defaultFilters: [],
      filterValue: '',
      file: '',
      pic: '',
      open: true
    };
  }


  handleChange(e) {
    this.setState({titleValue: e.target.value});
  }

  handleFilterChange(e) {
    this.setState({filterValue: e.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    const copy = this.state.defaultFilters;
    copy.push(this.state.filterValue);
    this.setState({defaultFilters: copy, filterValue: ''});
  }

  handleCreate() {
    superagent.post('/aws/upload/community')
    .attach('community', this.state.file)
    .end((err, res) => {
      if (err) {
        console.log(err);
        alert('failed uploaded!');
      }
    //   this.setState({pic: res.body.pictureURL, file: {}});
      if (this.state.titleValue) {
        this.props.handleCreate(res.body.pictureURL, this.state.titleValue, this.state.defaultFilters);
        this.setState({open: false});
      }
    });
  }

  handleUpload(file) {
    console.log('this is the file', file);
    this.setState({file: file});
  }

  saveImage() {
    superagent.post('/aws/upload/community')
    .attach('community', this.state.file)
    .end((err, res) => {
      if (err) {
        console.log(err);
        alert('failed uploaded!');
      }
      console.log('got to the end of it all');
      this.setState({pic: res.body.pictureURL, file: {}});
    });
  }

  render() {
    const optionsForUpload = {
      baseUrl: 'xxx',
      multiple: false,
      accept: 'image/*',
      didChoose: (files) => {
        this.handleUpload(files[0]);
      },
    };
    return (
        <Modal size={'small'}
               basic
               closeIcon="close"
               open={this.state.open}
        >
            <Modal.Header className="modalHeader">
                Edit your community!
            </Modal.Header>
            <Modal.Content scrolling>
                <img className="communityImgUpload" src={'http://www.sessionlogs.com/media/icons/defaultIcon.png'} />
                    <ReactUploadFile
                        style={{width: '80px', height: '40px'}}
                        chooseFileButton={<Button icon="plus" />}
                        options={optionsForUpload}/>
                        {this.state.file ? <button value="save" onClick={() => {this.saveImage();}}>Upload</button> : <p></p>}
                <Input
                       className="titleInput"
                       value={this.state.titleValue}
                       label="Title"
                       onChange={(e) => {this.handleChange(e);}} />
                <div style={{marginLeft: '10px', marginBottom: '2px', marginTop: '10px'}}>
                    Add Default Topics:
                </div>
                <ul>
                    {this.state.defaultFilters.map((filter, idx) => <li key={idx}>#{' '}{filter}</li>)}
                </ul>
                <Input labelPosition="left"
                       type="text"
                       placeholder="Topic here..."
                       value={this.state.filterValue}
                       onChange={(e) => {this.handleFilterChange(e);}} >
                    <Label basic><Icon name="hashtag" /></Label>
                    <input />
                </Input>
                <Button className="addButton" content="Add" icon="add" onClick={(e) => {this.handleClick(e);}} />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => this.handleCreate()}>
                    Create
                    <Icon name="lightning" />
                </Button>
            </Modal.Actions>
        </Modal>
    );
  }
}


EditCommunityModal.propTypes = {
  handleCreate: PropTypes.func
};


export default EditCommunityModal;
