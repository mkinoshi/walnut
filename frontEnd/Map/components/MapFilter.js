import React from 'react';
import PropTypes from 'prop-types';
import LocationSearch from '../containers/LocationSearch.js';

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
  },
  image: {
    width: '15%',
    height: '15%'
  },
  listOuter: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: '1px',
    marginBottom: '10px'
  },
  disc: {
    display: 'flex',
    flexDirection: 'column'
  }
};

class MapFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.outer}>
        <div style={styles.filter}>
          {/* <LocationSearch /> */}
        </div>
        <div style={styles.filterOuter}>
          {this.props.users.map((user) => (
            <li style={styles.listOuter}>
              <img src={user.profileURL} style={styles.image} />
            <div style={styles.disc}>
                <h4>{user.name}</h4>
                <p>{user.career}</p>
              </div>
            </li>
          ))}
        </div>
      </div>
    );
  }
}

MapFilter.propTypes = {
  users: PropTypes.array
};

export default MapFilter;
