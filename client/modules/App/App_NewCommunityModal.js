/**
 * Created by ebadgio on 8/10/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import css from './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Card, Label, Input, Modal, Form, Button, Icon, Image } from 'semantic-ui-react';


class NewCommunityModal extends React.Component {
  constructor() {
    super();
    this.state = {
      titleValue: '',
      image: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
      defaultFilters: [],
      filterValue: '',
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

  render() {
    return (
        <Modal size={'small'}
               basic
               trigger={ <Button className="modalTrigger" content="Create new Community" icon="add square" labelPosition="left" />}
               closeIcon="close"
        >
            <Modal.Header className="modalHeader">
                Create your Community!
            </Modal.Header>
            <Modal.Content scrolling>
                <Input
                       value={this.state.titleValue}
                       label="Title"
                       onChange={(e) => {this.handleChange(e);}} />
                <div style={{marginLeft: '10px', marginBottom: '5px', marginTop: '10px'}}>
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


NewCommunityModal.propTypes = {
  handleCreate: PropTypes.func
};


export default NewCommunityModal;
