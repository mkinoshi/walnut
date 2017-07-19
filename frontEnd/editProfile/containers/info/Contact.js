import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
  contact: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  }
};

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  toggleEdit() {
    this.setState({
      edit: !this.state.edit,
      email: this.props.email,
      address: this.props.address,
      phone: this.props.phone
    });
  }

  contactChange(val, key) {
    const obj = JSON.parse(JSON.stringify(this.state));
    obj[key] = val;
    this.setState(obj);
  }

  handleSave() {
    this.setState({edit: false});
    console.log('the state that gets sent to middleware', this.state);
    this.props.saveContact(this.state);
  }

  render() {
    return (
      <div style={styles.contact}>
        <h1>Contact</h1>
        <p onClick={() => (this.toggleEdit())}>E</p>
        <p>Email</p>
        {this.state.edit ?
          <input value={this.state.email}
            onChange={(e) => (this.contactChange(e.target.value, 'email'))} />
           :
           <p>{this.state.email ? this.state.email : this.props.email}</p>}

        <p>Address</p>
        {this.state.edit ?
          <input value={this.state.address}
            onChange={(e) => (this.contactChange(e.target.value, 'address'))} />
           :
           <p>{this.state.address ? this.state.address : this.props.address}</p>}

        <p>Phone</p>
        {this.state.edit ?
          <input value={this.state.phone}
            onChange={(e) => (this.contactChange(e.target.value, 'phone'))} />
          :
          <p>{this.state.phone ? this.state.phone : this.props.phone}</p>}

        {this.state.edit ?
          <a style={{backgroundColor: '#0D9ED3', float: 'right'}}
            className="waves-effect waves-light btn"
            onClick={() => this.handleSave()}>
            save</a>
          :
        <p></p>}
      </div>
    );
  }
}

Contact.propTypes = {
  email: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  saveContact: PropTypes.func
};

const mapStateToProps = (state) => ({
  email: state.createProfileReducer.info.contact.email,
  address: state.createProfileReducer.info.contact.address,
  phone: state.createProfileReducer.info.contact.phone
});

const mapDispatchToProps = (dispatch) => ({
  saveContact: (contactObj) => dispatch({type: 'SAVE_CONTACTS', contact: contactObj})
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
