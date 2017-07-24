import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
  outer: {
    width: '20vw',
    display: 'flex',
    flexDirection: 'column'
  },
  filter: {
    borderWidth: 1,
    height: '15vh'
  },
  filterOuter: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10%'
  },
  image: {
    width: '15%',
    height: '15%'
  },
  listOuter: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: '1px',
    marginBottom: '10px',
    backgroundColor: 'white'
  },
  listOuterClicked: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: '1px',
    marginBottom: '10px',
    backgroundColor: 'blue'
  },
  disc: {
    display: 'flex',
    flexDirection: 'column'
  }
};

class MapCard extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    // TODO highlight the user's tab and center the map on their location
    // change the people on the list based on nearby location
    this.props.updateCenter(this.props.location);
    this.props.updateZoom(10);
    this.props.updateClicked(this.props.index);
  }

  render() {
    return (this.props.clicked === this.props.index) ?
        <div style={styles.listOuterClicked} onClick={this.handleClick.bind(this)}>
          <img src={this.props.profileURL} style={styles.image} />
            <div style={styles.disc}>
                <span><strong>{this.props.name}</strong> <br/>{this.props.year}<br/>{this.props.career}</span>
            </div>
            <button type="button">Go to Profile</button>
        </div>
        :
        <div style={styles.listOuter} onClick={this.handleClick.bind(this)}>
          <img src={this.props.profileURL} style={styles.image} />
            <div style={styles.disc}>
                <span><strong>{this.props.name}</strong> <br/>{this.props.year}<br/>{this.props.career}</span>
            </div>
            <button type="button">Go to Profile</button>
        </div>;
  }
}

MapCard.propTypes = {
  changeCenter: PropTypes.func,
  changeZoom: PropTypes.func,
  profileURL: PropTypes.string,
  name: PropTypes.string,
  year: PropTypes.string,
  career: PropTypes.string,
  location: PropTypes.array,
  updateCenter: PropTypes.func,
  updateZoom: PropTypes.func,
  updateClicked: PropTypes.func,
  clicked: PropTypes.number,
  index: PropTypes.number
};

const mapStateToProps = (state) => ({
  clicked: state.mapReducer.clicked,
});

const mapDispatchToProps = (dispatch) => ({
  updateCenter: (newCenter) => dispatch({
    type: 'NEW_CENTER',
    center: newCenter,
  }),
  updateZoom: (num) => dispatch({
    type: 'UPDATE_ZOOM',
    num: num
  }),
  updateClicked: (index) => dispatch({
    type: 'UPDATE_CLICKED',
    clicked: index
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(MapCard);
