import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LocationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.onChange = (address) => this.setState({ address });
  }

  handleFormEnter(event) {
    // event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        this.props.updateCenter(latLng);
        this.props.updateZoom();
      })
      .catch(error => console.error('Error', error));
  }



  handleFormSubmit(event) {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        this.props.updateCenter(latLng);
        this.props.updateZoom();
      })
      .catch(error => console.error('Error', error));
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Enter location'
    };

    return (
      <form onSubmit={this.handleFormSubmit.bind(this)}>
        <PlacesAutocomplete inputProps={inputProps} onEnterKeyDown={this.handleFormEnter.bind(this)}/>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

LocationSearch.propTypes = {
  updateCenter: PropTypes.func,
  updateZoom: PropTypes.func
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  updateCenter: (newCenter) => dispatch({
    type: 'NEW_CENTER',
    center: newCenter,
  }),
  updateZoom: () => dispatch({
    type: 'UPDATE_ZOOM',
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
