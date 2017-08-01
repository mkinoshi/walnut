import React from 'react';
import PropTypes from 'prop-types';
import LocationSearch from './Map_Location_Search_Container';
import NameSearch from './Map_NameSearch';
import MapCard from './Map_Card';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import 'semantic-ui-css/semantic.min.css';
import {Button} from 'semantic-ui-react';
import './Map.css';
class MapFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: 'place'
    };
  }

  // handleClick(index) {
  //   // TODO highlight the user's tab and center the map on their location
  //   // change the people on the list based on nearby location
  //   this.props.changeCenter(user.location);
  //   this.props.changeZoom(10);
  //   console.log('clicked');
  // }

  render() {
    return (
      <div className="outerfilterall" >
        <Button.Group>
          {this.state.search === 'place' ?
            <Button positive>Place</Button> :
            <Button onClick={() => this.setState({search: 'place'})}>Place</Button>
          }
          <Button.Or />
          {this.state.search === 'place' ?
            <Button onClick={() => this.setState({search: 'person'})}>Person</Button> :
            <Button positive>Person</Button>
          }
        </Button.Group>
        {this.state.search === 'place' ?
          <div className="filter" >
            <LocationSearch />
          </div> :
          <div className="filter" >
            <NameSearch />
          </div>
        }
        <Scrollbars id="scrollbar" style={{height: '80vh', width: '20vw'}}>
          <div className="filterOuter" >
            {this.props.users.filter((item) => {return item.location[this.props.selected].length > 0;}).map((user, index) => (
              <MapCard
                id={user.id}
                key={uuidv4()}
                profileURL={user.pictureURL}
                name={user.fullName}
                year={user.education.classYear}
                college={user.education.college}
                career={user.currentOccupation}
                location={user.location[this.props.selected]}
              />
            ))}
          </div>
        </Scrollbars>
      </div>
    );
  }
}

MapFilter.propTypes = {
  changeCenter: PropTypes.func,
  changeZoom: PropTypes.func,
  users: PropTypes.array,
  clicked: PropTypes.string,
  selected: PropTypes.string
};

const mapStateToProps = (state) => ({
  clicked: state.mapReducer.clicked,
  selected: state.mapReducer.selected
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MapFilter);
