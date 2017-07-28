import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveAboutThunk from '../../../thunks/profile_thunks/saveAboutThunk';
import YearSelect from '../../SelectorDataSets/Years';
import PlacesAutocomplete from 'react-places-autocomplete';
import 'semantic-ui-css/semantic.min.css';
import { Button, Header, Image, Modal, Input, Checkbox, Form, Icon } from 'semantic-ui-react';

const styles = {
  form: {
    justifyContent: 'center'
  },
  inline: {
    paddingRight: '10px',
    paddingLeft: '10px',
    paddingBottom: '7px',
    display: 'inline-flex'
  },
  title: {
    paddingRight: '10px',
    paddingLeft: '10px'
  },
  button: {
    backgroundColor: '#fff',
    fontColor: '#1082ff'
  }
};


class AddSchool extends React.Component {
  constructor() {
    super();
    this.state = {
      graduated: false,
      schoolValue: '',
      open: false
    };
    this.handleChangeGraduated = this.handleChangeGraduated.bind(this);
    this.handleChangeSchool = this.handleChangeSchool.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.addSchool = this.addSchool.bind(this);
  }

  addSchool() {
    console.log('saved!', this.state);
    this.props.addSchool(this.state);
    this.setState({
      graduated: false,
      schoolValue: '',
      open: false});
  }

  handleChangeSchool(e, {value}) {
    this.setState({schoolValue: value});
  }

  handleChangeGraduated(e, { value }) {
    this.setState({graduated: !this.state.graduated});
  }

  handleStart(start) {
    this.setState({startedAt: start});
  }
  handleEnd(end) {
    this.setState({endedAt: end});
  }

  toggleModal() {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
        <Modal trigger={<Button onClick={() => this.toggleModal()}> + Add other Schools (high school, etc.)</Button>} open={this.state.open}>
            <Modal.Header>School</Modal.Header>
            <Modal.Content scrolling>
                <Modal.Description style={styles.form}>
                    <div style={styles.inline}>
                        <p style={styles.title}>School Name</p>
                        <Input placeholder="Where did you attend?"
                               value={this.state.schoolValue}
                               onChange={this.handleChangeSchool} />
                    </div>
                    <br></br>
                    <div style={styles.inline}>
                        <p style={styles.title}>Started at</p>
                        <YearSelect year={1956} handleSelect={this.handleStart} />
                    </div>
                    <div style={styles.inline}>
                        <p style={styles.title}>Ended at</p> <YearSelect year={1956} handleSelect={this.handleEnd}/>
                    </div>
                    <br></br>
                    <Checkbox
                        radio
                        label="Graduated"
                        checked={this.state.graduated === true}
                        onChange={this.handleChangeGraduated}
                    />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button secondary onClick={() => this.toggleModal()}> Cancel</Button>
                <Button primary onClick={() => {this.addSchool(); this.toggleModal();}}>
                    Save <Icon name="right chevron" />
                </Button>
            </Modal.Actions>
        </Modal>
        );
  }
}

AddSchool.propTypes = {
  addSchool: PropTypes.func
};

export default AddSchool;
