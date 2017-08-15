import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import PlacesAutocomplete from 'react-places-autocomplete';
import saveAboutThunk from '../../thunks/profile_thunks/saveAboutThunk';
import './EditProfile_2.css';

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
        homeTown: '',
        school: '',
        concentration: '',
        graduation: '',
        position: '',
        company: '',
        location: ''
    };
    this.handleChangeLocation = (location) => this.setState({location});
  }

  handleSubmit(e) {
      this.saveAbout({
          schools: {

          },
          colleges: {

          },
          works: {

          },
          places: {

          }
      });
  }

  handleChangeHome(e) {
      this.setState({homeTown: e.target.value});
  }

  handleChangeSchool(e) {
      this.setState({school: e.target.value});
  }

  handleChangeConcentration(e) {
      this.setState({concentration: e.target.value});
  }
  
  handleChangeGraduation(e) {
      this.setState({graduation: e.target.value});
      console.log(e.target.value);
  }

  handleChangePosition(e) {
      this.setState({position: e.target.value});
      console.log(e.target.value);
  }

  handleChangeCompany(e) {
      this.setState({company: e.target.value});
      console.log(e.target.value);
  }

  render() {
      const inputProps = {
        value: this.state.location,
        onChange: this.handleChangeLocation,
        placeholder: 'ex. Mountain View'
      };
      return (
        <div className="editPage">
            <div className="editCard">
                <form className="ui form" onSubmit={this.handleSubmit.bind(this)}>
                    {/* insert profile pic here */}
                    <div className="field">
                            <label>Hometown</label>
                            <input type="text" name="Hometown" placeholder="ex. Boston" 
                            onChange={this.handleChangeHome.bind(this)}/>
                        </div>
                    {/* education section */}
                    <h4 className="ui dividing header">Education</h4>
                        <div className="field">
                            <label>Current School (or most recent if graduated)</label>
                            <input type="text" name="College" placeholder="ex. University of Pennsylvania" 
                            onChange={this.handleChangeSchool.bind(this)}/>
                        </div>
                        <div className="field">
                            <div className="fields">
                            <div className="twelve wide field">
                                <label>Concentration</label>
                                <input type="text" name="Concentration" placeholder="ex. Computer Science" 
                                onChange={this.handleChangeConcentration.bind(this)}/>
                            </div>
                            <div className="four wide field">
                                <label>Graduation Year</label>
                                <input type="text" name="Graduation" placeholder="ex. 2020"
                                onChange={this.handleChangeGraduation.bind(this)}/>
                            </div>
                            </div>
                        </div>
                    {/* work experience */}
                    <h4 className="ui dividing header">Occupation</h4>
                        <div className="field">
                            <label>Position</label>
                            <input type="text" name="Position" placeholder="ex. Software Engineer"
                            onChange={this.handleChangePosition.bind(this)}/>
                        </div>
                        <div className="field">
                            <label>Company</label>
                            <input type="text" name="Company" placeholder="ex. Google"
                            onChange={this.handleChangeCompany.bind(this)}/>
                        </div>
                        <div className="field">
                            <label>Location</label>
                            <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleLocation} />
                        </div>
                    <div className="ui button" tabindex="0">Save</div>
                </form>
            </div>
        </div>
      );
  }
}


EditProfile.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    saveAbout: (about) => saveAboutThunk(about)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
