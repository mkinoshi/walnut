// renders in App
import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Menu, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App_Nav.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    };
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    let title;
    if (this.props.community) {
      title = this.props.community.title ? this.props.community.title.split(' ').join('') : 'bet';
    } else {
      title = 'missing';
    }
    return (
            <Menu icon size="small" id="nav_wrapper">
              <Menu.Item name="Home" active={this.state.activeItem === 'Home'} onClick={() => this.handleItemClick}>
                <Link to={'/app/walnuthome'}>
                  <Icon name="home" />
                </Link>
              </Menu.Item>

              <Menu.Item name="Discover" active={this.state.activeItem === 'Discover'} onClick={() => this.handleItemClick}>
                <Link to={'/app/community/' + title + '/discover'}>
                  <Icon name="star" /> <p>Discover</p>
                </Link>
              </Menu.Item>

              <Menu.Item name="Directory" active={this.state.activeItem === 'Directory'} onClick={() => this.handleItemClick}>
                <Link to={'/app/community/' + title + '/directory'}>
                  <Icon name="address book"/> <p>Directory</p>
                </Link>
              </Menu.Item>

              <Menu.Item name="Map" active={this.state.activeItem === 'Map'} onClick={() => this.handleItemClick}>
                <Link to={'/app/community/' + title + '/map'}>
                  <Icon name="marker" /> <p>Map</p>
                </Link>
              </Menu.Item>

              <Menu.Item name="Edit" active={this.state.activeItem === 'Edit'} onClick={() => this.handleItemClick}>
                <Link to={'/app/community/' + title + '/editprofile'}>
                  <Icon name="edit" /> <p>Edit Profile</p>
                </Link>
              </Menu.Item>

              <a href="#" style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Image src="http://i.imgur.com/TbhIBEJ.png" size="small"/>
              </a>

              <Menu.Menu position="right">
                <Menu.Item>
                  <a href="/logout">
                    <Icon name="log out" />
                    Logout</a>
                </Menu.Item>
                <Image src={this.props.pictureURL} size="mini" floated="right" style={{height: '50px'}} />
              </Menu.Menu>
            </Menu>
        );
  }
}

Navbar.propTypes = {
  pictureURL: PropTypes.string,
  community: PropTypes.object
};

const mapStateToProps = (state) => ({
  pictureURL: state.userReducer.pictureURL,
  community: state.userReducer.currentCommunity
});

const mapDispatchToProps = () => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
