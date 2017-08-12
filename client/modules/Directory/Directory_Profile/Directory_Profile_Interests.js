/**
 * Created by ebadgio on 7/29/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import '.././Directory.css';



class Interests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="Interests">
            <h1> Interests </h1>
        </div>
    );
  }
}

Interests.propTypes = {
  user: PropTypes.object
};

export default Interests;
