/**
 * Created by ebadgio on 7/20/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import css from './Directory.css';
import Card from './Directory_Deck_Card';
import uuidv4 from 'uuid/v4';

class DeckContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="Deck">
          <h1> I am the deck </h1>
          <Card key={uuidv4()} />
          <Card key={uuidv4()} />
          <Card key={uuidv4()} />
          <Card key={uuidv4()} />
          <Card key={uuidv4()} />
          <Card key={uuidv4()} />
            <Card key={uuidv4()} />
            <Card key={uuidv4()} />
            <Card key={uuidv4()} />
            <Card key={uuidv4()} />
            <Card key={uuidv4()} />
            <Card key={uuidv4()} />
            <Card key={uuidv4()} />
        </div>
    );
  }
}


DeckContainer.propTypes = {
  users: PropTypes.array
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckContainer);
