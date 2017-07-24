import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class MapItemSelectorContainer extends React.Component {

  handleClick(item) {
    this.props.updateCenter([-103.59179687498357, 40.66995747013945]);
    this.props.updateZoom(3);
    this.props.changeCategory(item);
  }

  render() {
    return(
            <div>
                <a className="waves-effect waves-light btn" onClick={() => this.handleClick('live')}>live</a>
                <a className="waves-effect waves-light btn" onClick={() => this.handleClick('college')}>college</a>
                <a className="waves-effect waves-light btn" onClick={() => this.handleClick('homeTown')}>from</a>
            </div>
        );
  }
}

MapItemSelectorContainer.propTypes = {
  changeCategory: PropTypes.func,
  updateCenter: PropTypes.func,
  updateZoom: PropTypes.func
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (type) => {
    dispatch({type: 'CHANGE_CATEGORY', selected: type});
  },
  updateCenter: (newCenter) => dispatch({
    type: 'NEW_CENTER',
    center: newCenter,
  }),
  updateZoom: (num) => dispatch({
    type: 'UPDATE_ZOOM',
    num: num
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapItemSelectorContainer);
