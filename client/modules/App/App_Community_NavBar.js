// renders in App
import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Image, Popup, Dropdown} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import css from './App.css';
import signOutThunk from '../../thunks/auth_thunks/signOutThunk';
import {history} from '../Auth/Auth_index';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isEdited
    };
  }

  handleClick(num) {
    this.props.changeTab(num);
  }

  handleLogout() {
    this.props.onLogout(history);
  }

  render() {
    let title;
    if (this.props.community) {
      title = this.props.community.title ? this.props.community.title.split(' ').join('') : 'bet';
    } else {
      title = 'missing';
    }
    return (
          <div className="row" id="navBar">

                <Link className="navBarHome" to={'/app/walnuthome'} onClick={() => {this.handleClick(1); this.setState({isOpen: true});}}>
                  <Icon name="content" size="big" />
                </Link>
              <div className="communityNavBarLogo">
                <img className="communityImage" src={this.props.community.icon} />
                <h2 className="communityTitle">{this.props.community.title}</h2>
              </div>

              <div className="navBarLinks">
                <div className="navBarLink" onClick={() => {this.handleClick(1); this.setState({isOpen: true});}}>
                  <Link className="tabs" to={'/app/community/' + title + '/discover'}>
                    <Icon className="navBarIcon" name="talk outline" size="big" />
                  </Link>
                  {(this.props.tab === 1) ?
                    <div className="bar">
                      </div> : null
                  }
                </div>

                <div className="navBarLink" onClick={() => {this.handleClick(2); this.setState({isOpen: true});}}>
                  <Link className="tabs" to={'/app/community/' + title + '/directory'}>
                    <Icon className="navBarIcon" name="address card outline" size="big"/>
                  </Link>
                  {(this.props.tab === 2) ?
                    <div className="bar">
                      </div> : null
                    }
                </div>

                <div className="navBarLink" onClick={() => {this.handleClick(3); this.setState({isOpen: true});}}>
                  <Link className="tabs" to={'/app/community/' + title + '/map'}>
                    <Icon className="navBarIcon" name="map" size="big"/>
                  </Link>
                  {(this.props.tab === 3) ?
                    <div className="bar">
                      </div> : null
                    }
                </div>

                {/* <div className="navBarLink" onClick={() => this.handleClick(4)}>
                  <Link className="tabs" to={'/app/community/' + title + '/editprofile'}>
                    <Icon className="navBarIcon" name="paypal" size="big"/>
                  </Link>
                  {(this.props.tab === 4) ?
                    <div className="bar">
                      </div> : null
                    }
                </div> */}
              </div>

            <div className="navBarLinksRight">
              <div className="imageWrapper">
                <img className="postUserImage" src={this.props.pictureURL} />
                {!(this.state.isOpen || this.props.isEdited) ?
                  <div className="profilePopoutOuterMost" onClick={() => this.setState({isOpen: true})}>
                    <div className="profilePopoutOuter">
                      <div className="arrow-up"></div>
                      <Link className="profilePopeoutHeaderTab" onClick={() => this.setState({isOpen: true})} to={'/app/community/' + title + '/editprofile'}>
                        <h2 className="profilePopeoutHeader">Complete the profile</h2>
                      </Link>
                    </div>
                  </div> : null}
              </div>
              <Dropdown className="profileDropdown link item" text={this.props.fullName} pointing>
                <Dropdown.Menu>
                  {/* <Dropdown.Item>
                    <Link className="profilePopeoutHeaderTab" to={'/app/community/' + title + '/editprofile'}>
                    Edit Profile
                    </Link>
                  </Dropdown.Item> */}
                  <Dropdown.Item onClick={() => this.handleLogout()}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <a className="logoutText" href="/logout">
              <Icon name="log out" className="logoutIcon" size="big"/>
                Logout</a> */}
            </div>
        </div>
        );
  }
}

Navbar.propTypes = {
  pictureURL: PropTypes.string,
  community: PropTypes.object,
  tab: PropTypes.number,
  changeTab: PropTypes.func,
  isEdited: PropTypes.bool,
  fullName: PropTypes.string,
  onLogout: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = (state) => ({
  pictureURL: state.userReducer.pictureURL,
  fullName: state.userReducer.fullName,
  community: state.userReducer.currentCommunity,
  tab: state.navBarReducer.tab,
  isEdited: state.userReducer.isEdited
});

const mapDispatchToProps = (dispatch) => ({
  changeTab: (tab) => dispatch({type: 'CHANGE_NAVBAR_TAB', tab: tab}),
  onLogout: (his) => dispatch(signOutThunk(his))
});


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
