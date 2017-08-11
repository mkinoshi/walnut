import React from 'react';
import PropTypes from 'prop-types';
import LocationSearch from './Map_Location_Search_Container';
import NameSearch from './Map_NameSearch';
import MapCard from './Map_Card';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import {Button} from 'semantic-ui-react';
import './Map.css';
class MapFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: 'place'
    };
  }


  render() {
    return (
      <div className="outerfilterall" >
        <Button.Group>
          {this.state.search === 'place' ?
            <Button positive>Place</Button> :
            <Button className="buttonPlaceNegative" onClick={() => this.setState({search: 'place'})}>Place</Button>
          }
          <Button.Or />
          {this.state.search === 'place' ?
            <Button onClick={() => this.setState({search: 'person'})}>Person</Button> :
            <Button className="buttonPersonNegative" positive>Person</Button>
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
                college={user.education.colleges[0]}
                career={user.currentOccupation}
                email={user.email}
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
