// renders in App
import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Dropdown} from 'semantic-ui-react';
import './App.css';
import signOutThunk from '../../thunks/auth_thunks/signOutThunk';
import {history} from '../Auth/Auth_index';
import EditCommunityModal from './App_EditCommunityModal';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isEdited,
      tab: 1,
      admin: false
    };
  }

  handleClick(num) {
    this.setState({tab: num});
  }

  handleLogout() {
    this.props.onLogout(history);
  }

  handleLogoClick() {
    console.log('it is here');
    if (this.props.community.admins.indexOf(this.props.user) !== -1) {
      this.setState({admin: true});
    }
  }

  handleSubmit(image, titleValue, defaultFilters) {
    // this.props.createCommunity(image, titleValue, defaultFilters);
    window.location.reload();
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

                <Link className="navBarHome" to={'/walnuthome'} onClick={() => {this.handleClick(1); this.setState({isOpen: true});}}>
                  <Icon name="content" size="big" />
                </Link>
              <div className="communityNavBarLogo">
                <img className="communityImage" src={this.props.community.icon} onClick={() => this.handleLogoClick()}/>
                <h3 className="communityTitle">{this.props.community.title}</h3>
              </div>

              <div className="navBarLinks">
                <div className="navBarLink" onClick={() => {this.handleClick(1); this.setState({isOpen: true});}}>
                  <Link className="tabs" to={'/community/' + title + '/discover'}>
                    <Icon className="navBarIcon" name="talk outline" size="large" />
                  </Link>
                  {(this.state.tab === 1) ?
                    <div className="bar">
                      </div> : null
                  }
                </div>

                <div className="navBarLink" onClick={() => {this.handleClick(2); this.setState({isOpen: true});}}>
                  <Link className="tabs" to={'/community/' + title + '/directory'}>
                    <Icon className="navBarIcon" name="address card outline" size="large"/>
                  </Link>
                  {(this.state.tab === 2) ?
                    <div className="bar">
                      </div> : null
                    }
                </div>

                <div className="navBarLink" onClick={() => {this.handleClick(3); this.setState({isOpen: true});}}>
                  <Link className="tabs" to={'/community/' + title + '/map'}>
                    <Icon className="navBarIcon" name="marker" size="large"/>
                  </Link>
                  {(this.state.tab === 3) ?
                    <div className="bar">
                      </div> : null
                    }
                </div>

                {/* <div className="navBarLink" onClick={() => this.handleClick(4)}>
                  <Link className="tabs" to={'/community/' + title + '/editprofile'}>
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
                {/* {!(this.state.isOpen || this.props.isEdited) ?*/}
                  {/* <div className="profilePopoutOuterMost" onClick={() => this.setState({isOpen: true})}>*/}
                    {/* <div className="profilePopoutOuter">*/}
                      {/* <div className="arrow-up"></div>*/}
                      {/* <Link className="profilePopeoutHeaderTab" onClick={() => this.setState({isOpen: true})} to={'/community/' + title + '/editprofile'}>*/}
                        {/* <h2 className="profilePopeoutHeader">Complete the profile</h2>*/}
                      {/* </Link>*/}
                    {/* </div>*/}
                  {/* </div> : null}*/}
              </div>
              <Dropdown className="profileDropdown link item" text={this.props.fullName} pointing>
                <Dropdown.Menu>
                   {/* <Dropdown.Item>*/}
                    {/* <Link className="profilePopeoutHeaderTab" to={'/community/' + title + '/editprofile'}>*/}
                    {/* Edit Profile*/}
                    {/* </Link>*/}
                  {/* </Dropdown.Item>*/}
                  <Dropdown.Item onClick={() => this.handleLogout()}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <a className="logoutText" href="/logout">
              <Icon name="log out" className="logoutIcon" size="big"/>
                Logout</a> */}
            </div>
            {this.state.admin ?
              <EditCommunityModal handleCreate={(image, titleValue, defaultFilters) => this.handleSubmit(image, titleValue, defaultFilters)} /> :
              null
            }
        </div>
        );
  }
}

Navbar.propTypes = {
  pictureURL: PropTypes.string,
  community: PropTypes.object,
  changeTab: PropTypes.func,
  isEdited: PropTypes.bool,
  fullName: PropTypes.string,
  onLogout: PropTypes.func,
  history: PropTypes.object,
  user: PropTypes.string
};

const mapStateToProps = (state) => ({
  pictureURL: state.userReducer.pictureURL,
  fullName: state.userReducer.fullName,
  user: state.userReducer._id,
  community: state.userReducer.currentCommunity,
  isEdited: state.userReducer.isEdited
});

const mapDispatchToProps = (dispatch) => ({
  changeTab: (tab) => dispatch({type: 'CHANGE_NAVBAR_TAB', tab: tab}),
  onLogout: (his) => dispatch(signOutThunk(his))
});


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
