/**
 * Created by ebadgio on 7/20/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Directory_Deck_Card';
import uuidv4 from 'uuid/v4';

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

class DeckContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // handleClick(id) {
  //       // this.props.renderProfile(id)
  // }

  render() {
    // console.log(this.props.profiles);
    return (
        <div style={styles.container}>
          <h1> I am the deck </h1>
            {this.props.profiles.map((profile, index) =>
              <Card key={uuidv4()} handleClick={this.handleClick} profile={profile} index={index}/>)}
        </div>
    );
  }
}


DeckContainer.propTypes = {
  profiles: PropTypes.array,
  renderProfile: PropTypes.func
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  renderProfile: (id) => dispatch({type: 'GET_ONE_PROFILE', owner: id})
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckContainer);
