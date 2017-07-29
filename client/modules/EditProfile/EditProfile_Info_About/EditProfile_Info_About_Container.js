/**
 * Created by ebadgio on 7/26/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveAboutThunk from '../../../thunks/profile_thunks/saveAboutThunk';
import Paper from 'material-ui/Paper';
import AddCollege from './EditProfile_AddCollege';
import 'semantic-ui-css/semantic.min.css';
import AddHighSchool from './EditProfile_AddSchool';
import AddPlace from './EditProfile_AddPlace';
import AddWork from './EditProfile_AddWork';
import { Button } from 'semantic-ui-react';



const styles = {
  about: {
    backgroundColor: '#fff',
    width: 'auto',
    height: 'auto',
    minHeight: '300px',
    minWidth: '200px',
    marginBottom: '10px',
    paddingLeft: '10%',
    marginLeft: '100px',
    marginRight: 'auto'
  },
  popover: {
    height: '500px',
    width: '500px'
  },
  checkbox: {
    marginBottom: 16,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class AboutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCollege: false,
      openWork: false,
      openSchool: false,
      openPlace: false,
      colleges: this.props.colleges ? this.props.colleges : [],
      works: this.props.works ? this.props.works : [],
      places: this.props.placesLived ? this.props.placesLived : {hometown: '', current: '', other: []},
      schools: this.props.schools ? this.props.schools : []
    };
    this.onChange = (address) => this.setState({ address });
    this.addCollege = this.addCollege.bind(this);
    this.addWork = this.addWork.bind(this);
    this.addPlace = this.addPlace.bind(this);
    this.addSchool = this.addSchool.bind(this);
    this.handlePlaceRemove = this.handlePlaceRemove.bind(this);
  }

  handleCollegeRemove(property, idx) {
    const copy = this.state.colleges;
    copy.splice(idx, 1);
    this.setState({collegse: copy});
  }

  handleWorkRemove(property, idx) {
    const copy = this.state.colleges;
    copy.splice(idx, 1);
    this.setState({works: copy});
  }

  handleSchoolRemove(property, idx) {
    const copy = this.state.colleges;
    copy.splice(idx, 1);
    this.setState({schools: copy});
  }

  handlePlaceRemove(when, idx) {
    const copy = this.state.places;
    if (when === 'hometown' || when === 'current') {
      copy[when] = '';
    } else if (when === 'other') {
      copy.other.splice(idx, 1);
    }
    this.setState({places: copy});
  }


  handleSave() {
    this.props.saveAbout({schools: this.state.schools,
        colleges: this.state.colleges,
        works: this.state.works,
        places: this.state.places});
    this.setState({isEditing: false});
  }

  addCollege(college) {
    const copy = this.state.colleges.slice();
    const concentrations = [];
    if (college.con1) {
      concentrations.push(college.con1);
    }
    if (college.con2) {
      concentrations.push(college.con2);
    }
    const add = {
      name: college.collegeValue,
      concentrations: concentrations,
      startedAt: college.startedAt,
      endedAt: college.endedAt,
      isGraduated: college.graduated,
      attendedFor: college.attendedFor,
      degreeType: college.degreeType
    };
    copy.push(add);
    console.log('made it college', add, copy);
    this.setState({colleges: copy});
  }

  addWork(work) {
    const copy = this.state.works.slice();
    const add = {
      company: work.company,
      location: work.address,
      position: work.position,
      isCurrent: work.isCurrent
    };
    copy.push(add);
    console.log('made it work', add, copy);
    this.setState({works: copy});
  }

  addPlace(place) {
    const copy = this.state.places;
    if (place.when === 'other') {
      copy.other.push(place.location);
    } else {
      copy[place.when] = place.location;
    }
    console.log('made it place', place, copy);
    this.setState({places: copy});
  }

  addSchool(school) {
    const copy = this.state.schools.slice();
    const add = {
      name: school.schoolValue,
      startedAt: school.startedAt,
      endedAt: school.endedAt,
      isGraduated: school.graduated
    };
    copy.push(add);
    console.log('made it School', add, copy);
    this.setState({schools: copy});
  }

  render() {
    console.log(this.state)
    return (
      <Paper style={styles.about} zDepth={1}>
      <h1>About</h1>
          {this.state.isEditing ? null : <Button primary onClick={() => this.setState({isEditing: true})}>Edit</Button>}
        {this.state.works.map((work, idx) => {
          if (work.isCurrent) {
            if (this.state.isEditing) {
              return (<div>
                <p>Working as a {work.position} at {work.company}</p>
                <Button secondary onClick={() => {this.handleWorkRemove(work, idx);}}>X</Button>
              </div>);
            }
            return <p>Working as a {work.position} at {work.company}</p>;
          } else {
            if (this.state.isEditing) {
              return (<div>
                  <p>Worked as a {work.position} at {work.company} </p>
                  <Button secondary onClick={() => {this.handleWorkRemove(work, idx);}}>X</Button>
                </div>);
            }
            return <p>Worked as a {work.position} at {work.company} </p>;
          }
        })}
        {this.state.isEditing ?
        <div>
          <AddWork addWork={this.addWork} />
        </div> : null}
        {this.state.colleges ? this.state.colleges.map((college, idx) => {
          let concentrations;
          if (college.concentrations.length === 1) {
            concentrations = college.concentrations[0];
          } else if (college.concentrations.length === 2) {
            concentrations = college.concentrations[0] + ' & ' + college.concentrations[1];
          }
          if (!college.isGraduated) {
            if (college.attendedFor === 'Undergraduate') {
              if (this.state.isEditing) {
                return (<div>
                  <p>Studies {concentrations} at {college.name}</p>
                  <Button secondary onClick={() => {this.handleCollegeRemove(college, idx);}}>X</Button>
                </div>);
              }
              return <p>Studies {concentrations} at {college.name}</p>;
            } else {
              if (this.state.isEditing) {
                return (<div>
                    <p>Earning a {college.degreeType} from {college.name}</p>
                    <Button secondary onClick={() => {this.handleCollegeRemove(college, idx);}}>X</Button>
                  </div>);
              }
              return <p>Earning a {college.degreeType} from {college.name}</p>;
            }
          } else {
            if (college.attendedFor === 'Undergraduate') {
              if (this.state.isEditing) {
                return (<div>
                  <p>Graduated from {college.name} in {college.endedAt}</p>
                  <Button secondary onClick={() => {this.handleCollegeRemove(college, idx);}}>X</Button>
                </div>);
              }
              return (<p>Graduated from {college.name} in {college.endedAt}</p>);
            } else {
              if (this.state.isEditing) {
                return (<div>
                    <p>Earned a {college.degreeType} from {college.name} in {college.endedAt}</p>
                    <Button secondary onClick={() => {this.handleCollegeRemove(college, idx);}}>X</Button>
                  </div>);
              }
              return <p>Earned a {college.degreeType} from {college.name} in {college.endedAt}</p>;
            }
          }
        }) : null}
        {this.state.isEditing ?
        <div>
          <AddCollege addCollege={this.addCollege} />
        </div> : null}
        {this.state.schools ? this.state.schools.map((school, idx) => {
          if (!school.isGraduated) {
            if (this.state.isEditing) {
              return (<div>
                          <p>Attends {school.name}</p>
                          <Button secondary onClick={() => {this.handleSchoolRemove(school, idx);}}>X</Button>
                        </div>);
            }
            return <p>Attends {school.name}</p>;
          } else {
            if (this.state.isEditing) {
              return (<div>
                          <p>Graduated from {school.name} in {school.endedAt} </p>
                          <Button secondary onClick={() => {
                            this.handleSchoolRemove(school, idx);
                          }}>X</Button>
                        </div>);
            }
            return <p>Graduated from {school.name} in {school.endedAt} </p>;
          }
        }) : null}

        {this.state.isEditing ? <div>
          <AddHighSchool addSchool={this.addSchool} />
        </div> : null}

        {this.state.places.current ?
            <div>{this.state.isEditing ?
                <div>
                  <p>Lives in {this.state.places.current}</p>
                  <Button secondary onClick={() => {this.handlePlaceRemove('current');}}>X</Button>
                </div> :
                <p>Lives in {this.state.places.current}</p>}</div> :
            null}

        {this.state.places.other.map((place, idx) => {
          if (this.state.isEditing) {
            return (<div>
                  <p>Lived in {place}</p>
                  <Button secondary onClick={() => {
                    this.handlePlaceRemove('other', idx);
                  }}>X</Button>
                </div>);
          }
          return <p>Lived in {place}</p>;
        })}

        {this.state.places.hometown ? <div>
            {this.state.isEditing ? <div>
              <p>From {this.state.places.hometown}</p>
              <Button secondary onClick={()=>{this.handlePlaceRemove('hometown');}}>X</Button>
            </div> :
                <p>From {this.state.places.hometown}</p>}</div> :
            null}

        {this.state.isEditing ? <div>
          <AddPlace addPlace={this.addPlace} />
        </div> : null}
          {this.state.isEditing ? <Button primary onClick={() => this.handleSave()}>Done</Button> : null}
      </Paper>
    );
  }
}

AboutContainer.propTypes = {
  works: PropTypes.array,
  colleges: PropTypes.array,
  schools: PropTypes.object,
  placesLived: PropTypes.object,
  saveAbout: PropTypes.func
};

const mapStateToProps = (state) => ({
  colleges: state.userReducer.education.colleges,
  highSchool: state.userReducer.education.schools,
  works: state.userReducer.work,
  placesLived: state.userReducer.placesLived
});

const mapDispatchToProps = (dispatch) => ({
  saveAbout: (about) => saveAboutThunk(about)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);
