/**
 * Created by ebadgio on 7/29/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import '.././Directory.css';


class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="Contacts">
            <h1> Contacts </h1>
        </div>
    );
  }
}

Contacts.propTypes = {
  user: PropTypes.object
};

export default Contacts;
