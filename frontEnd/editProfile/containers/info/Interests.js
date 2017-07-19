import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
  interestsContainer: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%',
    marginBottom: '100px'
  },
  interests: {
    border: '1px solid white',
    borderRadius: '3px',
    margin: '5px',
    padding: '5px',
  },
  inline: {
    display: '-webkit-inline-box'
  }
};

class InterestsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false
    };
    this.startEdit = this.startEdit.bind(this);
    this.removeInterest = this.removeInterest.bind(this);
    this.addInterest = this.addInterest.bind(this);
    this.openInput = this.openInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  startEdit() {
    const newInterests = this.state.newInterests ? this.state.newInterests : this.props.interests;
    this.setState({isEditing: true, newInterests: newInterests});
  }

  removeInterest(interest) {
    const ints = this.state.newInterests;
    ints.splice(ints.indexOf(interest), 1);
    this.setState({newInterests: ints});
  }

  addInterest(interest) {
    const ints = this.state.newInterests;
    ints.push(interest);
    this.setState({newInterests: ints, inputOn: false, interestInput: ''});
  }

  openInput() {
    this.setState({inputOn: true});
  }

  handleChange(event) {
    const input = event.target.value;
    this.setState({
      interestInput: input,
    });
  }

  saveChanges() {
    this.setState({isEditing: false});
    this.props.saveInterests(this.state.newInterests);
  }

  render() {
    return (
      <div style={styles.interestsContainer}>
        <p>Interests</p>
          {!this.state.isEditing ? <div style={styles.inline}>
              {this.state.newInterests ?
                  this.state.newInterests.map((interest, idx) => <p style={styles.interests} key={idx}>#{interest}</p>) :
                  this.props.interests.map((interest, idx) => <p style={styles.interests} key={idx}>#{interest}</p>)}
            <button onClick={() => {this.startEdit();}}>Edit Interests</button>
          </div> :
              <div style={styles.inline}>
              {this.props.interests.map((interest, idx) => <div key={idx} style={styles.inline}>
                <button onClick={() => {this.removeInterest(interest);}}>X</button>
                <p style={styles.interests}>#{interest}</p>
              </div>)}
            <button onClick={() => {this.openInput();}}>+</button>
          </div>}
            {this.state.inputOn ? <div style={styles.inline}>
              <input type="text"
                     placeholder="Enter new interest"
                     value={this.state.interestInput ? this.state.interestInput : ''}
                     onChange={(e) => {this.handleChange(e);}}/>
              <button onClick={() => {this.addInterest(this.state.interestInput);}}>Add Interest</button>
            </div> : null}
            <div>
            {this.state.isEditing ? <button onClick={() => {this.saveChanges();}}>Save changes</button> : null}
            </div>
      </div>
    );
  }
}

InterestsContainer.propTypes = {
  interests: PropTypes.array,
  saveInterests: PropTypes.func
};

const mapStateToProps = (state) => ({
  interests: state.createProfileReducer.info.interests
});

const mapDispatchToProps = (dispatch) => ({
  saveInterests: (interests) => dispatch({type: 'SAVE_INTERESTS', interests: interests})
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestsContainer);
