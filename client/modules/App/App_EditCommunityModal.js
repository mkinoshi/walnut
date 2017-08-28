
// COMMUNITY ADMIN MODAL

import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Label, Input, Modal, Button, Icon, List } from 'semantic-ui-react';
import ReactUploadFile from 'react-upload-file';
import superagent from 'superagent';
import Select from 'react-select';

class EditCommunityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: this.props.community.title,
      image: this.props.community.icon,
      oldFilters: this.props.community.defaultTags,
      defaultFilters: this.props.community.defaultTags.map((tag) => tag.name),
      newFilters: [],
      users: this.props.community.users,
      admins: this.props.community.admins,
      filterValue: '',
      file: '',
      pic: '',
      admin: ''
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

  handleUpdate() {
    if (this.state.titleValue && this.state.defaultFilters && this.state.admins) {
      const oldTags = this.state.oldFilters.filter((f) => this.state.defaultFilters.indexOf(f.name) !== -1);
      const newTags = this.state.defaultFilters.filter((f) => this.state.oldFilters.filter((fi) => fi.name === f).length === 0);
      if (this.state.file) {
        superagent.post('/aws/upload/community')
          .attach('community', this.state.file)
          .end((err, res) => {
            if (err) {
              console.log(err);
              alert('failed uploaded!');
            }
            console.log(res.body.pictureURL);
            this.props.handleUpdate(res.body.pictureURL, this.state.titleValue, oldTags, newTags, this.state.admins);
          });
      } else {
        this.props.handleUpdate(this.state.image, this.state.titleValue, oldTags, newTags, this.state.admins);
      }
      this.setState({open: false});
    }
  }

  handleUpload(file) {
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
      this.setState({image: res.body.pictureURL, file: {}});
    });
  }

  handleAdmin(user) {
    if (this.state.admins.length > 1) {
      const newState = this.state.admins.filter((u) => u._id !== user._id);
      console.log(newState);
      this.setState({admins: newState});
    }
  }

  handleAddAdminChange(value) {
    if (value) {
      const newState = this.state.admins.concat(value);
      this.setState({admin: ''});
      this.setState({admins: newState});
    }
  }

  handleRemoveTag(tag) {
    if (this.state.defaultFilters.length > 0) {
      const newState = this.state.defaultFilters.filter((t) => t !== tag);
      this.setState({defaultFilters: newState});
    }
  }

  render() {
    const optionsForUpload = {
      baseUrl: 'xxx',
      multiple: false,
      accept: 'image/*',
      didChoose: (files) => {
        console.log(files);
        this.handleUpload(files[0]);
      },
    };
    return (
        <Modal size={'small'}
               basic
               closeIcon="close"
               trigger={ <Button className="modalEditTrigger" content="Edit Community" icon="edit" labelPosition="left" />}
        >
            <Modal.Header className="modalHeader">
                Edit your community!
            </Modal.Header>
            <Modal.Content scrolling>
                <img className="communityImgUpload" src={this.state.image} />
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
                <h2>Admin</h2>
                <List divided verticalAlign="middle">
                  {this.state.admins.map((user) => (
                    <List.Item>
                      <Icon name="remove" size="tiny" verticalAlign="middle" onClick={() => this.handleAdmin(user)}/>
                      <List.Content>
                        <List.Header className="adminFname">{user.fullName}</List.Header>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
                <p>Add user to admin</p>
                <Select
                  className="editCommunitySelector"
                  name="selected-state"
                  value={this.state.admin}
                  simpleValue
                  clearable
                  options={this.state.users.filter((user) => this.state.admins.map((u) => u._id).indexOf(user._id) === -1).map((user) => {
                    return {value: user, label: user.fullName};
                  })}
                  onChange={this.handleAddAdminChange.bind(this)}
                  placeholder="Search by Name"
                />
                <h2>Default Topics:</h2>
                <ul>
                    <List divided verticalAlign="middle">
                      {this.state.defaultFilters.map((filter, idx) => (
                        <List.Item key={idx}>
                          <Icon name="remove" size="tiny" verticalAlign="middle" onClick={() => this.handleRemoveTag(filter)}/>
                          <List.Content>
                            <List.Header className="adminFname">#{' '}{filter}</List.Header>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
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
                <Button onClick={() => this.handleUpdate()}>
                    Update
                    <Icon name="lightning" />
                </Button>
            </Modal.Actions>
        </Modal>
    );
  }
}


EditCommunityModal.propTypes = {
  handleUpdate: PropTypes.func,
  handleLogoClose: PropTypes.func,
  community: PropTypes.object,
  admins: PropTypes.array
};


export default EditCommunityModal;
