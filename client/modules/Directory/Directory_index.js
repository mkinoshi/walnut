import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeckContainer from './Directory_Deck_Container';
import Profile from './Directory_Profile';


// TODO needs to call deck container and profile container
// TODO profile only dispatches different search actions

const styles = {
  header: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  },
  page: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  profile: {
    flex: 3,
    backgroundColor: 'red',
  }
};

class Directory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
  }

  render() {
    return (
        <div style={styles.page}>
          <DeckContainer style={styles.container}/>
          <Profile style={styles.profile} user={this.props.users[this.state.currentIndex]}/>
        </div>
    );
  }
}


Directory.propTypes = {
  users: PropTypes.array
};

const mapStateToProps = (state) => ({
  users: state.deckReducer.profiles
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
