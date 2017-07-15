import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// TODO Quote content


class Quote extends React.Component {

  render() {
    return (
      <div>
        <p>{this.props.quote}</p>
        <p>{this.props.name}</p>
      </div>
    );
  }
}

Quote.propTypes = {
  quote: PropTypes.string,
  name: PropTypes.string
};

const mapStateToProps = (state) => ({
  quote: state.quoteReducer.quote,
  name: state.quoteReducer.createdBy
});

const mapDispatchToProps = (dispatch) => ({
  // filter.name
  toggleChecked: (name) => dispatch({type: 'TOGGLE_FILTER_CHECKED', name: name})
});

export default connect(mapStateToProps, mapDispatchToProps)(Quote);
