/**
 * Created by ebadgio on 7/20/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DeckContainer extends React.Component {

  render() {
    return (
        <div>
            <h1 style={}>I am the Deck</h1>

        </div>
    );
  }
}


DeckContainer.propTypes = {
};

const mapStateToProps = (state) => ({
    users: state.deckReducer
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckContainer);