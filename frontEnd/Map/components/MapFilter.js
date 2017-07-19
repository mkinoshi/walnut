import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Message, Dropdown } from 'semantic-ui-react';

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
];


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

  handleClick(user) {
    // TODO highlight the user's tab and center the map on their location
    // change the people on the list based on nearby location
    this.props.changeCenter(user.location);
    this.props.changeZoom(10);
    console.log('clicked');
  }

  render() {
    return (
      <div style={styles.outer}>
        <div style={styles.filter}>
          <Dropdown placeholder="Skills" fluid multiple selection options={options} />
        </div>
        <div style={styles.filterOuter}>
          {this.props.users.map((user) => (
            <li style={styles.listOuter} onClick={() => {this.handleClick(user);}}>
              <img src={user.profileURL} style={styles.image} />
            <div style={styles.disc}>
                <span><strong>{user.name}</strong> <br/>{user.year}<br/>{user.career}</span>
              </div>
            </li>
          ))}
        </div>
      </div>

      // <div>
      //   <Menu vertical>
      //   {this.props.users.map((user) => (
      //     <Menu.Item>
      //     <img src={user.profileURL} style={styles.image} />
      //     {user.name} <br/>
      //     {user.career}
      //     </Menu.Item>
      //     ))}
      //     <Menu.Item href="//google.com" target="_blank"> <span>
      //     <img src="https://static.pexels.com/photos/20787/pexels-photo.jpg" height="50"/>
      //     Visit Google </span> </Menu.Item>
      //     <Menu.Item link>Link via prop</Menu.Item>
      //     <Menu.Item onClick={this.handleClick}>Javascript Link</Menu.Item>
      //   </Menu>
      // </div>

    );
  }
}

MapFilter.propTypes = {
  changeCenter: PropTypes.func,
  changeZoom: PropTypes.func,
  users: PropTypes.array
};

export default MapFilter;
