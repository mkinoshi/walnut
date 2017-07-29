/**
 * Created by ebadgio on 7/26/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlacesAutocomplete from 'react-places-autocomplete';
import 'semantic-ui-css/semantic.min.css';
import { Button, Header, Image, Modal, Input, Checkbox, Form, Icon } from 'semantic-ui-react';

const styles = {
  modal: {
    display: 'flex',
    flexDirection: 'row'
  },
  form: {
    flex: 1
  },
  loc: {
    flex: 1
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


class AddPlace extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      open: false
    };

    this.onChange = (address) => this.setState({address: address});
    this.handleChangeWhen = this.handleChangeWhen.bind(this);
    this.addPlace = this.addPlace.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

  addPlace() {
    console.log('saved!', this.state);
    this.props.addPlace(this.state);
  }

  handleChangeWhen(e, { value }) {
    this.setState({when: value});
  }

  handleLocation(e) {
    console.log('loc', e);
    this.setState({address: e, location: e});
  }

  toggleModal() {
    this.setState({open: !this.state.open});
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Where did you live?'
    };
    return (
            <Modal trigger={<Button onClick={() => this.toggleModal()}> + Add a place you've lived</Button>} open={this.state.open}>
                <Modal.Header>Places lived</Modal.Header>
                <Modal.Content scrolling>
                    <Modal.Description style={styles.modal}>
                        <div style={styles.loc}>
                            <div style={styles.inline}>
                                <p style={styles.title}>City/town</p>
                                <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleLocation}/>
                            </div>
                        </div>
                        <Form style={styles.form}>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label="Currently living here"
                                    name="checkboxRadioGroup"
                                    value="current"
                                    checked={this.state.when === 'current'}
                                    onChange={this.handleChangeWhen}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label="Hometown"
                                    name="checkboxRadioGroup"
                                    value="hometown"
                                    checked={this.state.when === 'hometown'}
                                    onChange={this.handleChangeWhen}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label="Somewhere in between"
                                    name="checkboxRadioGroup"
                                    value="other"
                                    checked={this.state.when === 'other'}
                                    onChange={this.handleChangeWhen}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={() => this.toggleModal()}> Cancel</Button>
                    <Button primary onClick={() => {this.addPlace(); this.toggleModal();}}>
                        Save <Icon name="right chevron" />
                    </Button>
                </Modal.Actions>
            </Modal>
        );
  }
}

AddPlace.propTypes = {
  addPlace: PropTypes.func
};



export default AddPlace;
