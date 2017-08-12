
import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Button, Header, Modal, Input, Checkbox, Icon } from 'semantic-ui-react';

const styles = {
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


class AddWork extends React.Component {
  constructor() {
    super();
    this.state = {
      current: false,
      address: '',
      open: false
    };

    this.onChange = (address) => this.setState({address: address});
    this.handleChangePosition = this.handleChangePosition.bind(this);
    this.handleChangeCurrent = this.handleChangeCurrent.bind(this);
    this.handleChangeWork = this.handleChangeWork.bind(this);
    this.addWork = this.addWork.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

  addWork() {
    this.props.addWork(this.state);
    this.setState({
      isCurrent: false,
      address: '',
      open: false
    });
  }

  handleChangeWork(e, {value}) {
    this.setState({company: value});
  }

  handleChangePosition(e, { value }) {
    this.setState({position: value});
  }
  handleChangeCurrent(e, { value }) {
    this.setState({isCurrent: !this.state.isCurrent});
  }

  handleLocation(e) {
    this.setState({address: e, location: e});
  }

  toggleModal() {
    this.setState({open: !this.state.open});
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Where were you located?'
    };
    return (
        <Modal trigger={<Button onClick={() => this.toggleModal()}> + Add a new Work</Button>} open={this.state.open}>
            <Modal.Header>Work</Modal.Header>
            <Modal.Content scrolling>
                <Modal.Description>
                    <div style={styles.inline}>
                        <p style={styles.title}>Company</p>
                        <Input placeholder="Where did you work?"
                               value={this.state.company}
                               onChange={this.handleChangeWork} />
                    </div>
                    <br></br>
                    <div style={styles.inline}>
                        <p style={styles.title}>Position</p>
                        <Input placeholder="What did you do?"
                               value={this.state.position}
                               onChange={this.handleChangePosition}  />
                    </div>
                    <Checkbox
                        radio
                        label="Currently working here"
                        checked={this.state.isCurrent === true}
                        onChange={this.handleChangeCurrent}
                    />
                    <br></br>
                    <div style={styles.inline}>
                        <p style={styles.title}>Location</p>
                        <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleLocation}/>
                    </div>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button secondary onClick={() => this.toggleModal()}> Cancel</Button>
                <Button primary onClick={() => {this.addWork(); this.toggleModal();}}>
                    Save <Icon name="right chevron" />
                </Button>
            </Modal.Actions>
        </Modal>
    );
  }
}

AddWork.propTypes = {
  addWork: PropTypes.func
};



export default AddWork;
