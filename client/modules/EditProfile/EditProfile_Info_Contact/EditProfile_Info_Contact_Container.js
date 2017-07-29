/**
 * Created by ebadgio on 7/28/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveContactThunk from '../../../thunks/profile_thunks/saveContactThunk';
import Paper from 'material-ui/Paper';
import { Button, Header, Image, Modal, Input, Checkbox, Form, Icon  } from 'semantic-ui-react';

const styles = {
  contact: {
    backgroundColor: '#fff',
    width: 'auto',
    height: 'auto',
    minHeight: '300px',
    minWidth: '200px',
    paddingLeft: '10%',
    marginLeft: '100px',
    marginRight: 'auto'
  }
};

class ContactContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      email: this.props.email ? this.props.email : [],
      phones: this.props.phones ? this.props.phones : [],
      emailVal: '',
      addingEmail: false,
      phoneVal: '',
      addingPhone: false,
      useVal: ''
    };
    this.toggleEdit  = this.toggleEdit.bind(this);
    this.removeEmail = this.removeEmail.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.addEmail = this.addEmail.bind(this);
    this.removePhone = this.removePhone.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.addPhone = this.addPhone.bind(this);
    this.handleUseChange = this.handleUseChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  toggleEdit() {
    this.setState({
      edit: true,
    });
  }

  removeEmail(email, idx) {
    const copy = this.state.email.slice();
    copy.splice(idx, 1);
    this.setState({email: copy});
  }

  handleEmailChange(e, {value}) {
    this.setState({emailVal: value});
  }

  addEmail() {
    const copy = this.state.email.slice();
    copy.push(this.state.emailVal);
    this.setState({email: copy, emailVal: '', addingEmail: false});
  }

  removePhone(idx) {
    const copy = this.state.phones.slice();
    copy.splice(idx, 1);
    this.setState({phones: copy});
  }

  handlePhoneChange(e, { value }) {
    this.setState({phoneVal: value});
  }


  handleUseChange(e, { value }) {
    this.setState({useVal: value});
  }

  addPhone() {
    const copy = this.state.phones.slice();
    const add = {
      use: this.state.useVal,
      number: this.state.phoneVal
    };
    copy.push(add);
    this.setState({phones: copy, useVal: '', phoneVal: '', addingPhone: false});
  }

  handleSave() {
    this.props.saveContact({
      phones: this.state.phones,
      email: this.state.email
    });
    this.setState({edit: false});
  }

  render() {
    console.log('state', this.state);
    return (
            <Paper style={styles.contact}>
                <h1>Contact</h1>
                <Button primary onClick={() => (this.toggleEdit())}>Edit</Button>
                <h2>Email</h2>
                {this.state.email.length > 0 ? this.state.email.map((email, idx) => {
                  if (this.state.edit) {
                    return (<div>
                            <p>{email}</p>
                            <Button secondary onClick={() => {this.removeEmail(email, idx);}}>X</Button>
                        </div>);
                  }
                  return <p>{email}</p>;
                }) : null}
                {this.state.edit && !this.state.addingEmail ? <Button primary onClick={() => this.setState({addingEmail: true})}> + Add an Email</Button> : null}
                {this.state.addingEmail ? <div>
                    <Input value={this.state.emailVal} onChange={this.handleEmailChange}/>
                    <Button primary onClick={() => {this.addEmail();}}>Add</Button>
                </div> : null}


                <h2>Phone</h2>
                {this.state.phones.length > 0 ? this.state.phones.map((phone, idx) => {
                  let formatted = '';
                  phone.number.split('').forEach((char, i) => {
                    if (i === 0) {
                      formatted += ('(' + char);
                    } else if (i === 2) {
                      formatted += (char + ')-');
                    } else if (i === 5) {
                      formatted += (char + '-');
                    } else {
                      formatted += char;
                    }
                  });
                  if (this.state.edit) {
                    return (<div>
                            <p>{phone.use}:{' '}{formatted}</p>
                            <Button secondary onClick={() => {this.removePhone(idx);}}>X</Button>
                        </div>);
                  }
                  return <p>{phone.use}:{' '}{formatted}</p>;
                }) : null}
                {this.state.edit && !this.state.addingPhone ? <Button primary onClick={() => this.setState({addingPhone: true})}> + Add a Phone</Button> : null}

                {this.state.addingPhone ? <div>
                    <Input value={this.state.phoneVal}
                           placeholder="(ex. 4325557689)"
                           label="Number"
                           onChange={this.handlePhoneChange} />
                    <Input value={this.state.useVal}
                           label="Use"
                           placeholder="(ex. work, personal, business, etc.)"
                           onChange={this.handleUseChange} />
                    <Button primary onClick={() => {this.addPhone();}}>Add</Button>
                </div> : null}
                <div>
                {this.state.edit ?
                    <Button primary onClick={() => {this.handleSave();}}>Save</Button>
                    :
                    <p></p>}</div>
            </Paper>
        );
  }
}

ContactContainer.propTypes = {
  email: PropTypes.string,
  phones: PropTypes.string,
  saveContact: PropTypes.func
};

const mapStateToProps = (state) => ({
  email: state.userReducer.contact.email,
  phones: state.userReducer.contact.phones
});

const mapDispatchToProps = (dispatch) => ({
  saveContact: (contactObj) => saveContactThunk(contactObj)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer);
