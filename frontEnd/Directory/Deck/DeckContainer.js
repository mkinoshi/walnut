/**
 * Created by ebadgio on 7/20/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Card';

class DeckContainer extends React.Component {
    constructor() {
        super();
        this.state = {
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(id) {

    }

  render() {
    return (
        <div>
            <h1 style={}>I am the Deck</h1>
            {this.props.profiles.map((prof, idx) => <Card key={idx} handleClick={this.handleClick} prof={prof} />)}
        </div>
    );
  }
}


DeckContainer.propTypes = {
    profiles: PropTypes.array
};

const mapStateToProps = (state) => ({
    profiles: state.deckReducer
});

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckContainer);