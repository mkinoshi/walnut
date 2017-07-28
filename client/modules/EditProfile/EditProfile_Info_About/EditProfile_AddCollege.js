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
  }
};


class AddCollege extends React.Component {
  constructor() {
    super();
    this.state = {
      graduated: false,
      collegeValue: '',
      attendedFor: '',
      degreeType: '',
      open: false
    };
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.handleChangeGraduated = this.handleChangeGraduated.bind(this);
    this.handleChangeCollege = this.handleChangeCollege.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleChangeCon1 = this.handleChangeCon1.bind(this);
    this.handleChangeCon2 = this.handleChangeCon2.bind(this);
    this.addCollege = this.addCollege.bind(this);
  }

  addCollege() {
    console.log('saved!', this.state);
    this.props.addCollege(this.state);
    this.setState({graduated: false,
        collegeValue: '',
        open: false});
  }

  handleChangeCollege(e, {value}) {
    this.setState({collegeValue: value});
  }

  handleChangeCon1(e, {value}) {
    this.setState({con1: value});
  }

  handleChangeCon2(e, {value}) {
    this.setState({con2: value});
  }

  handleChangeDegree(e, { value }) {
    this.setState({degreeType: value});
  }

  handleChangeRadio(e, { value }) {
    this.setState({attendedFor: value});
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
        <Modal trigger={<Button onClick={() => this.toggleModal()}> + Add a College</Button>} open={this.state.open}>
            <Modal.Header>College</Modal.Header>
            <Modal.Content scrolling>
                <Modal.Description style={styles.form}>
                        <div style={styles.inline}>
                            <p style={styles.title}>College</p>
                            <Input placeholder="Where did you attend?"
                                   value={this.state.collegeValue}
                                   onChange={this.handleChangeCollege} />
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
                        <div style={styles.inline}>
                            <p style={styles.title}>Concentrations</p>
                            <div>
                                <Input placeholder="What did you study?"
                                       value={this.state.con1}
                                       onChange={this.handleChangeCon1}  />
                                <Input placeholder="Anything else?"
                                       value={this.state.con2}
                                       onChange={this.handleChangeCon2} />
                            </div>
                        </div>
                        <br></br>
                        <Checkbox
                            radio
                            label="Graduated"
                            checked={this.state.graduated === true}
                            onChange={this.handleChangeGraduated}
                        />
                        <Form>
                            <Form.Field>
                                Attended For
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label="Undergraduate"
                                    name="checkboxRadioGroup"
                                    value="Undergraduate"
                                    checked={this.state.attendedFor === 'Undergraduate'}
                                    onChange={this.handleChangeRadio}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label="Graduate"
                                    name="checkboxRadioGroup"
                                    value="Graduate"
                                    checked={this.state.attendedFor === 'Graduate'}
                                    onChange={this.handleChangeRadio}
                                />
                            </Form.Field>
                        </Form>
                        {this.state.attendedFor === 'Graduate' ? <div style={styles.inline}>
                            <p style={styles.title}>Degree</p>
                            <Input placeholder="What is the Degree?"
                                   value={this.state.degreeType}
                                   onChange={this.handleChangeDegree} />
                        </div> : null}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button secondary onClick={() => this.toggleModal()}> Cancel</Button>
                <Button primary onClick={() => {this.addCollege(); this.toggleModal();}}>
                    Save <Icon name="right chevron" />
                </Button>
            </Modal.Actions>
        </Modal>
    );
  }
}

AddCollege.propTypes = {
  addCollege: PropTypes.func
};

export default AddCollege;
