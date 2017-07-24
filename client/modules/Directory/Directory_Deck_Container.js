/**
 * Created by ebadgio on 7/20/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Directory_Deck_Card';
import uuidv4 from 'uuid/v4';

class DeckContainer extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
        // this.props.renderProfile(id)
  }

  render() {
    console.log(this.props.profiles);
    return (
        <div>
            <h1>I am the Deck</h1>
            {this.props.profiles.map((profile, idx) =>
              <Card key={uuidv4()} handleClick={this.handleClick} profile={profile}/>)}
        </div>
    );
  }
}


DeckContainer.propTypes = {
  profiles: PropTypes.array,
  renderProfile: PropTypes.func
};

const mapStateToProps = (state) => ({
  profiles: state.deckReducer.profiles
});

const mapDispatchToProps = (dispatch) => ({
  renderProfile: (id) => dispatch({type: 'GET_ONE_PROFILE', owner: id})
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckContainer);
