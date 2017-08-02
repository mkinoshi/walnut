
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Feed from '../Feed/Feed_index';
import HeaderContainer from './Discover_Header_Container';
import discoverLoadThunk from '../../thunks/discover_thunks/discoverLoadThunk';



class Home extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.getDiscoverContent();
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <Feed />
      </div>
    );
  }
}

Home.propTypes = {
  getDiscoverContent: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  getDiscoverContent: () => discoverLoadThunk(dispatch)
});

export default connect(mapDispatchToProps)(Home);

