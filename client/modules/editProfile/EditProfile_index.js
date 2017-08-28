import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Image, Dropdown } from 'semantic-ui-react';
import PlacesAutocomplete from 'react-places-autocomplete';
import saveAboutThunk from '../../thunks/profile_thunks/saveAboutThunk';
import './EditProfile.css';
import superagent from 'superagent';
import ReactUploadFile from 'react-upload-file';

const options = [{text: 2010, value: 2010}, {text: 2011, value: 2011}, {text: 2012, value: 2012},
    {text: 2013, value: 2013}, {text: 2014, value: 2014}, {text: 2015, value: 2015},
    {text: 2016, value: 2016}, {text: 2017, value: 2017}, {text: 2018, value: 2018},
    {text: 2019, value: 2019}, {text: 2020, value: 2020}, {text: 2021, value: 2021},
    {text: 2022, value: 2022}, {text: 2023, value: 2023}, {text: 2024, value: 2024}];

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTown: props.homeTown,
      school: props.school,
      concentration: props.concentration,
      graduation: props.graduation,
      position: props.position,
      company: props.company,
      location: props.location,
      saved: false,
      file: '',
      pic: ''
    };
    this.handleChangeLocation = (location) => this.setState({location});
    this.handleChangeHome = (location) => this.setState({homeTown: location});
  }

  componentDidMount() {
    this.setState({saved: false});
  }

  handleSubmit(e) {
    console.log('hello');
    e.preventDefault();
    this.props.saveAbout({
      colleges: [{
        name: this.state.school,
        endedAt: this.state.graduation,
        concentrations: [this.state.concentration],
      }],
      works: [{
        company: this.state.company,
        position: this.state.position,
        location: this.state.location
      }],
      places: {
        current: this.state.homeTown
      }
    });
  }

  handleChangeSchool(e) {
    this.setState({school: e.target.value});
  }

  handleChangeConcentration(e) {
    this.setState({concentration: e.target.value});
  }

  handleChangeGraduation(e, props) {
    this.setState({graduation: props.value});
  }

  handleChangePosition(e) {
    this.setState({position: e.target.value});
  }

  handleChangeCompany(e) {
    this.setState({company: e.target.value});
  }

  handleUpload(file) {
    console.log('this is the file', file);
    this.setState({ file: file });
  }

  saveImage() {
    superagent.post('/aws/upload/profile')
          .attach('profile', this.state.file)
          .end((err, res) => {
            if (err) {
              console.log(err);
              alert('failed uploaded!');
            }
            console.log('finally at the front', res.body);
            this.setState({ file: ''});
            this.props.refreshUser({ user: res.body.user});
          });
  }

  render() {
    const inputPropsHome = {
      value: this.state.homeTown,
      onChange: this.handleChangeHome,
      placeholder: 'ex. Boston'
    };
    const inputProps = {
      value: this.state.location,
      onChange: this.handleChangeLocation,
      placeholder: 'ex. Mountain View'
    };
    const optionsForUpload = {
      baseUrl: 'xxx',
      multiple: false,
      accept: 'image/*',
      didChoose: (files) => {
        this.handleUpload(files[0]);
      },
    };
    return (
        <div className="editPage">
            <div className="editCard">
                <form className="ui form" onSubmit={this.handleSubmit.bind(this)}>
                    {/* insert profile pic here */}
                    <div className="field">
                            <label>Hometown</label>
                            <PlacesAutocomplete inputProps={inputPropsHome} onSelect={this.handleLocation} />
                        </div>
                    {/* education section */}
                    <h4 className="ui dividing header">Education</h4>
                        <div className="field">
                            <label>Current School (or most recent if graduated)</label>
                            <input type="text" name="College" placeholder="ex. University of Pennsylvania"
                            value={this.state.school}
                            onChange={this.handleChangeSchool.bind(this)}/>
                        </div>
                        <div className="field">
                            <div className="fields">
                            <div className="ten wide field">
                                <label>Concentration</label>
                                <input type="text" name="Concentration" placeholder="ex. Computer Science"
                                value={this.state.concentration}
                                onChange={this.handleChangeConcentration.bind(this)}/>
                            </div>
                            <div className="six wide field">
                                <label>Graduation Year</label>
                                {/* <input type="text" name="Graduation" placeholder="ex. 2020"
                                onChange={this.handleChangeGraduation.bind(this)}/> */}
                                {/* <YearSelect year={'2000'} handleSelect={this.handleChangeGraduation.bind(this)} /> */}
                                <Dropdown id="graduation" placeholder={this.state.graduation ? this.state.graduation : 'ex. 2020'} fluid selection onChange={this.handleChangeGraduation.bind(this)}
                                options={options}/>
                            </div>
                            </div>
                        </div>
                    {/* work experience */}
                    <h4 className="ui dividing header">Occupation</h4>
                        <div className="field">
                            <label>Position</label>
                            <input type="text" name="Position" placeholder="ex. Software Engineer"
                            value={this.state.position}
                            onChange={this.handleChangePosition.bind(this)}/>
                        </div>
                        <div className="field">
                            <label>Company</label>
                            <input type="text" name="Company" placeholder="ex. Google"
                            value={this.state.company}
                            onChange={this.handleChangeCompany.bind(this)}/>
                        </div>
                        <div className="field">
                            <label>Location</label>
                            <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleLocation} />
                        </div>
                    <span>
                    <Button type="submit" onClick={() => this.setState({saved: true})}>Save</Button>
                    {this.state.saved ?
                    <div style={{color: 'black'}}>Your changes have been saved!</div>
                    : null}
                    </span>
                </form>
            </div>
            <div className="editProfilePic">
                <div className="profilePicBox">
                   <Image src={this.props.profilePic} size="small" /> 
                  </div>
                <ReactUploadFile
                    chooseFileButton={<Button>Change</Button>}
                    options={optionsForUpload} />
                {this.state.file ? <Button value="save" onClick={() => { this.saveImage(); }}>Upload</Button> : <p></p>}
            </div>
        </div>
      );
  }
}


EditProfile.propTypes = {
  school: PropTypes.string,
  homeTown: PropTypes.string,
  concentration: PropTypes.string,
  graduation: PropTypes.string,
  position: PropTypes.string,
  company: PropTypes.string,
  saveAbout: PropTypes.func,
  location: PropTypes.string,
  profilePic: PropTypes.string,
  refreshUser: PropTypes.func
};

const mapStateToProps = (state) => ({
  homeTown: state.userReducer.placesLived.current,
  school: state.userReducer.education.colleges[0] ? state.userReducer.education.colleges[0].name : '',
  concentration: state.userReducer.education.colleges[0] ?
        (state.userReducer.education.colleges[0].concentrations ? state.userReducer.education.colleges[0].concentrations[0] : '')
        : '',
  graduation: state.userReducer.education.colleges[0] ? state.userReducer.education.colleges[0].endedAt : '',
  position: state.userReducer.work[0] ? state.userReducer.work[0].position : '',
  company: state.userReducer.work[0] ? state.userReducer.work[0].company : '',
  location: state.userReducer.work[0] ? state.userReducer.work[0].location : '',
  profilePic: state.userReducer.pictureURL
});

const mapDispatchToProps = (dispatch) => ({
  saveAbout: (about) => saveAboutThunk(about)(dispatch),
  refreshUser: (user) => dispatch({ type: 'GET_USER_DATA_DONE', user: user})
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
