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
    this.props.updateZoom(Math.max(10, this.props.zoom));
    this.props.updateClicked(this.props.id);
  }

  render() {
    return (this.props.clicked === this.props.id) ?
        <div className="ui list">
          <div className="item clicked" onClick={() => this.handleClick()}>
            <img className="ui avatar image" style={styles.image} src={this.props.profileURL} />
            <div className="content">
              <a className="header">{this.props.name}</a>
              <div className="description">{this.props.email}</div>
            </div>
          </div>
         </div>
        :
        <div className="ui list">
          <div className="item">
            <img className="ui avatar image" style={styles.image} src={this.props.profileURL} onClick={() => this.handleClick()}/>
            <div className="content">
              <a className="header">{this.props.name}</a>
              <div className="description">{this.props.email}</div>
            </div>
          </div>
         </div>;
  }
}

MapCard.propTypes = {
  changeCenter: PropTypes.func,
  changeZoom: PropTypes.func,
  id: PropTypes.string,
  profileURL: PropTypes.string,
  name: PropTypes.string,
  year: PropTypes.string,
  career: PropTypes.string,
  location: PropTypes.array,
  updateCenter: PropTypes.func,
  updateZoom: PropTypes.func,
  updateClicked: PropTypes.func,
  clicked: PropTypes.string,
  selected: PropTypes.string,
  zoom: PropTypes.number,
  email: PropTypes.string
};

const mapStateToProps = (state) => ({
  clicked: state.mapReducer.clicked,
  selected: state.mapReducer.selected,
  zoom: state.mapReducer.zoom
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
  updateClicked: (id) => dispatch({
    type: 'UPDATE_CLICKED',
    clicked: id
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(MapCard);
