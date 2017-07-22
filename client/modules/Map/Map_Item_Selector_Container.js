import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class MapItemSelectorContainer extends React.Component {
  render() {
    return(
            <div>
                <a className="waves-effect waves-light btn" onClick={() => this.props.changeCategory('live')}>live</a>
                <a className="waves-effect waves-light btn" onClick={() => this.props.changeCategory('college')}>college</a>
            </div>
        );
  }
}

MapItemSelectorContainer.propTypes = {
  changeCategory: PropTypes.func,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (type) => {
    dispatch({type: 'CHANGE_CATEGORY', selected: type});
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapItemSelectorContainer);