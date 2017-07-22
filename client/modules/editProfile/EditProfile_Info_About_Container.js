import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { connect } from 'react-redux';

const styles = {
  about: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  }
};

class AboutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  toggleEdit() {
    this.setState({
      edit: !this.state.edit,
      education: this.props.education,
      majors: this.props.majors,
      currentOccupation: this.props.currentOccupation,
      currentOccupationCity: this.props.currentOccupationCity,
      pastOccupations: this.props.pastOccupations
    });
  }

  aboutChange(val, key, index) {
    const obj = JSON.parse(JSON.stringify(this.state));
    if(key === 'majors' || key === 'pastOccupations') {
      obj[key][index] = val;
    } else {
      obj[key] = val;
    }
    this.setState(obj);
  }

  add(key) {
    if(key === 'majors') {
      console.log('in here');
      this.setState({majors: this.state.majors.concat([''])});
    } else if(key === 'pastOccupations') {
      this.setState({pastOccupations: this.state.pastOccupations.concat([''])});
    }
  }

  handleSave() {
    this.setState({edit: false});
    console.log('the state that gets sent to middleware', this.state);
    this.props.saveAbout(this.state);
  }

  render() {
    const inputProps = {
      value: this.state.currentOccupationCity,
      onChange: (e) => this.aboutChange(e, 'currentOccupationCity')
    };
    return (
      <div style={styles.about}>
        <h1>About</h1>
        <p onClick={() => (this.toggleEdit())}>E</p>
        <p>Education</p>
        {this.state.edit ?
          <input value={this.state.education}
            onChange={(e) => (this.aboutChange(e.target.value, 'education'))} />
           :
           <p>{this.state.education ? this.state.education : this.props.education}</p>}
        <p>Majors</p>
        {this.state.edit ?
        <p onClick={() => (this.add('majors'))}>Add</p> : <p></p>}
        <div>
          {this.state.majors ?
            this.state.majors.map((major, i) => {
              return this.state.edit ?
            <input
              key={i}
              value={this.state.majors[i]}
              onChange={(e) => (this.aboutChange(e.target.value, 'majors', i))} />
             :
             <p key={i}>{major}</p>;}) :
            this.props.majors.map((major, i) => {
              return this.state.edit ?
            <input
              key={i}
              value={this.state.majors[i]}
              onChange={(e) => (this.aboutChange(e.target.value, 'majors', i))} />
             :
             <p key={i}>{major}</p>;})}
           </div>
        <p>Current Occupation</p>
        {this.state.edit ?
          <input value={this.state.currentOccupation}
            onChange={(e) => (this.aboutChange(e.target.value, 'currentOccupation'))} />
           :
           <p>{this.state.currentOccupation ? this.state.currentOccupation : this.props.currentOccupation}</p>}
        <p>Current Occupation City</p>
        {this.state.edit ?
          <PlacesAutocomplete inputProps={inputProps} />
          // <input value={this.state.currentOccupationCity}
          //   onChange={(e) => (this.aboutChange(e.target.value, 'currentOccupationCity'))} />
           :
           <p>{this.state.currentOccupationCity ? this.state.currentOccupationCity : this.props.currentOccupationCity}</p>}
        {this.state.edit ?
          <p onClick={() => (this.add('pastOccupations'))}>Add</p> : <p></p>}
        <p>Past Occupations</p>
        <div>
          {this.state.pastOccupations ?
            this.state.pastOccupations.map((job, i) => {
              return this.state.edit ?
              <input
                key={i}
                value={this.state.pastOccupations[i]}
                onChange={(e) => (this.aboutChange(e.target.value, 'pastOccupations', i))} />
               :
               <p key={i}>{job}</p>;}) :
            this.props.pastOccupations.map((job, i) => {
              return this.state.edit ?
            <input
              key={i}
              value={this.state.pastOccupations[i]}
              onChange={(e) => (this.aboutChange(e.target.value, 'pastOccupations', i))} />
             :
             <p key={i}>{job}</p>;})}
           </div>
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

AboutContainer.propTypes = {
  education: PropTypes.string,
  majors: PropTypes.array,
  currentOccupation: PropTypes.string,
  currentOccupationCity: PropTypes.string,
  pastOccupations: PropTypes.array,
  saveAbout: PropTypes.func
};

const mapStateToProps = (state) => ({
  education: state.userReducer.education.college,
  majors: state.userReducer.education.majors,
  currentOccupation: state.userReducer.currentOccupation,
  currentOccupationCity: state.userReducer.currentOccupationCity,
  pastOccupations: state.userReducer.pastOccupations
});

const mapDispatchToProps = (dispatch) => ({
  saveAbout: (about) => dispatch({type: 'SAVE_ABOUT', about: about})
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);
