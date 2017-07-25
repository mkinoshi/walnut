import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// TODO Quote content

const styles = {
  container: {
    marginLeft: '10%'
  },
  quote: {
    fontSize: '180%',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  name: {
    fontSize: '180%',
    fontStyle: 'italic',
    textAlign: 'center'
  }
};

class QuoteContainer extends React.Component {

  render() {
    return (
      <div style={styles.container}>
        <p style={styles.quote}>" {this.props.quote} "</p>
        <p style={styles.name}>- {this.props.name}</p>
      </div>
    );
  }
}

QuoteContainer.propTypes = {
  quote: PropTypes.string,
  name: PropTypes.string
};

const mapStateToProps = (state) => ({
  quote: state.quoteReducer.quote,
  name: state.quoteReducer.createdBy
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(QuoteContainer);
