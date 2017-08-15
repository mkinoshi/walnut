import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import './EditProfile_2.css';

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }


  render() {
      return (
      <form className="ui form">
          {/* insert profile pic here */}
          <div className="field">
                <label>Hometown</label>
                <input type="text" name="Hometown" placeholder="ex. Boston" />
            </div>
          <h4 className="ui dividing header">Education</h4>
            <div className="field">
                <label>Current School (or most recent if graduated)</label>
                <input type="text" name="College" placeholder="ex. University of Pennsylvania" />
            </div>
            <div className="field">
                <div className="fields">
                <div className="twelve wide field">
                    <label>Concentration</label>
                    <input type="text" name="Concentration" placeholder="ex. Computer Science" />
                </div>
                <div className="four wide field">
                    <label>Graduation Year</label>
                    <input type="text" name="Graduation" placeholder="ex. 2020" />
                </div>
                </div>
            </div>
          <h4 className="ui dividing header">Work Experience</h4>
          <div className="ui button" tabindex="0">Save</div>
      </form>
      );
  }
}


EditProfile.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
