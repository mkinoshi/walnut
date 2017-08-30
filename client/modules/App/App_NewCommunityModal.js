/**
 * Created by ebadgio on 8/10/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Label, Input, Modal, Button, Icon } from 'semantic-ui-react';
import ReactUploadFile from 'react-upload-file';
import superagent from 'superagent';

class NewCommunityModal extends React.Component {
  constructor() {
    super();
    this.state = {
      titleValue: '',
      image: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
      otherTags: [],
      filterValue: '',
      file: '',
      pic: '',
      open: false
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
    const copy = this.state.otherTags;
    copy.push(this.state.filterValue);
    this.setState({otherTags: copy, filterValue: ''});
  }

  handleNewComm() {
    console.log('in here', this.state.titleValue);
    if (this.state.file !== '') {
      console.log('inside here', this.state.file);
      // superagent.post('/aws/upload/community')
      //   .attach('community', this.state.file)
      //   .end((err, res) => {
      //     if (err) {
      //       console.log(err);
      //       alert('failed uploaded!');
      //     }
      //     if (this.state.titleValue) {
      //       this.props.handleCreate(res.body.pictureURL, this.state.titleValue, this.state.defaultFilters);
      //       this.setState({ open: false });
      //     }
      //   });
    } else if (this.state.titleValue) {
      console.log('no file selected');
      this.props.handleCreate(this.state.image, this.state.titleValue, this.state.defaultFilters);
      this.setState({ open: false });
    }
  }

  handleUpload(file) {
    console.log('this is the file', file);
    this.setState({file: file});
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    console.log('cheeky url', url, reader.result);
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
               trigger={ <Button className="modalTrigger" content="Create new Community" icon="add square" labelPosition="left"
               onClick={() => this.setState({open: true})} />}
               closeIcon="close"
               open={this.state.open}
        >
            <Modal.Header className="modalHeader">
                Create your Community!
            </Modal.Header>
            <Modal.Content scrolling>
                <img className="communityImgUpload" src={'http://www.sessionlogs.com/media/icons/defaultIcon.png'} />
                    <ReactUploadFile
                        style={{width: '80px', height: '40px'}}
                        chooseFileButton={<Button icon="plus" />}
                        options={optionsForUpload}/>
                <Input
                       className="titleInput"
                       value={this.state.titleValue}
                       label="Title"
                       onChange={(e) => {this.handleChange(e);}} />
                <div style={{marginLeft: '10px', marginBottom: '2px', marginTop: '10px'}}>
                    Add Default Topics:
                </div>
                <ul>
                    {this.state.otherTags.map((filter, idx) => <li key={idx}>#{' '}{filter}</li>)}
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
                <Button onClick={() => this.handleNewComm(this.state.image, this.state.titleValue, this.state.otherTags)}>
                    Create
                    <Icon name="lightning" />
                </Button>
            </Modal.Actions>
        </Modal>
    );
  }
}


NewCommunityModal.propTypes = {
  handleCreate: PropTypes.func
};


export default NewCommunityModal;
