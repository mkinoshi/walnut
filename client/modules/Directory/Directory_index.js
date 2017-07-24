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
    };
  }

  componentDidMount() {
    this.props.getAllUsersDirectory();
  }

  handleClick() {
  }

  render() {
    return (
        <div style={styles.page}>
          <DeckContainer profiles={this.props.users} handleClick={this.handleClick.bind(this)}/>
          <Profile user={this.props.users[this.props.clicked]}/>
        </div>
    );
  }
}


Directory.propTypes = {
  users: PropTypes.array,
  getAllUsersDirectory: PropTypes.func,
  clicked: PropTypes.number
};

const mapStateToProps = (state) => ({
  users: state.deckReducer.profiles,
  clicked: state.deckReducer.clicked
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsersDirectory: () => dispatch({
    type: 'GET_ALL_USERS_DIRECTORY'
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
