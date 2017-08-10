import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Icon} from 'semantic-ui-react';
class MapItemSelectorContainer extends React.Component {

  handleClick(item) {
    this.props.updateCenter([-103.59179687498357, 40.66995747013945]);
    this.props.updateZoom(3);
    this.props.changeCategory(item);
  }

  render() {
    console.log(this.props.category);
    return(
            <div className="iconWrapper">
                <div className={this.props.category === 'live' ? 'iconSelectorWrapper1' : 'iconSelectorWrapper2'}><Icon name="clock" onClick={() => this.handleClick('live')} /></div>
                <div className={this.props.category === 'college' ? 'iconSelectorWrapper1' : 'iconSelectorWrapper2'}><Icon name="university" onClick={() => this.handleClick('college')} /></div>
                <div className={this.props.category === 'homeTown' ? 'iconSelectorWrapper1' : 'iconSelectorWrapper2'}><Icon name="home" onClick={() => this.handleClick('homeTown')} /></div>
                {/* <a className="waves-effect waves-light btn" onClick={() => this.handleClick('live')}>live</a>
                <a className="waves-effect waves-light btn" onClick={() => this.handleClick('college')}>college</a>
                <a className="waves-effect waves-light btn" onClick={() => this.handleClick('homeTown')}>from</a> */}
            </div>
        );
  }
}

MapItemSelectorContainer.propTypes = {
  changeCategory: PropTypes.func,
  updateCenter: PropTypes.func,
  updateZoom: PropTypes.func,
  category: PropTypes.string
};

const mapStateToProps = (state) => ({
  category: state.mapReducer.selected
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
