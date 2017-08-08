// renders in App
import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import css from './App.css';

class Navbar extends React.Component {

  handleClick(num) {
    this.props.changeTab(num);
  }


  render() {
    let title;
    console.log('this.props.community', this.props.community);
    if (this.props.community) {
      title = this.props.community.title ? this.props.community.title.split(' ').join('') : 'bet';
    } else {
      title = 'missing';
    }
    return (
          <div className="row" id="navBar">

                <Link className="navBarHome" to={'/app/walnuthome'} onClick={() => this.handleClick(1)}>
                  <Icon name="content" size="big" />
                </Link>
              <div className="communityNavBarLogo">
                <img className="communityImage" src={this.props.community.icon} />
                <h2 className="communityTitle">{this.props.community.title}</h2>
              </div>

              <div className="navBarLinks">
                <div className="navBarLink" onClick={() => this.handleClick(1)}>
                  <Link className="tabs" to={'/app/community/' + title + '/discover'}>
                    <Icon className="navBarIcon" name="talk outline" size="big" />
                  </Link>
                  {(this.props.tab === 1) ?
                    <div className="bar">
                      </div> : null
                  }
                </div>

                <div className="navBarLink" onClick={() => this.handleClick(2)}>
                  <Link className="tabs" to={'/app/community/' + title + '/directory'}>
                    <Icon className="navBarIcon" name="address card outline" size="big"/>
                  </Link>
                  {(this.props.tab === 2) ?
                    <div className="bar">
                      </div> : null
                    }
                </div>

                <div className="navBarLink" onClick={() => this.handleClick(3)}>
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
              <a className="logoutText" href="/logout">
              <Icon name="log out" className="logoutIcon" size="big"/>
                Logout</a>
              <div className="imageWrapper">
                <img className="postUserImage" src={this.props.pictureURL} />
              </div>
            </div>
        </div>
        );
  }
}

Navbar.propTypes = {
  pictureURL: PropTypes.string,
  community: PropTypes.object,
  tab: PropTypes.number,
  changeTab: PropTypes.func
};

const mapStateToProps = (state) => ({
  pictureURL: state.userReducer.pictureURL,
  community: state.userReducer.currentCommunity,
  tab: state.navBarReducer.tab
});

const mapDispatchToProps = (dispatch) => ({
  changeTab: (tab) => dispatch({type: 'CHANGE_NAVBAR_TAB', tab: tab})
});


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
