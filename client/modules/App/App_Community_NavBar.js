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

                <a href="#" className="logoHolder">
                <h1 className="logo">Walnut</h1>
                </a>

              <div className="navBarLinks">
                <div className="navBarLink" onClick={() => this.handleClick(1)}>
                  <Link className="tabs" to={'/app/community/' + title + '/discover'}>
                    <Icon name="talk outline" size="big" />
                  </Link>
                  {(this.props.tab === 1) ?
                    <div className="bar">
                      </div> : null
                  }
                </div>

                <div className="navBarLink" onClick={() => this.handleClick(2)}>
                  <Link className="tabs" to={'/app/community/' + title + '/directory'}>
                    <Icon name="address card outline" size="big"/>
                  </Link>
                  {(this.props.tab === 2) ?
                    <div className="bar">
                      </div> : null
                    }
                </div>

                <div className="navBarLink" onClick={() => this.handleClick(3)}>
                  <Link className="tabs" to={'/app/community/' + title + '/map'}>
                    <Icon name="map" size="big"/>
                  </Link>
                  {(this.props.tab === 3) ?
                    <div className="bar">
                      </div> : null
                    }
                </div>

                <div className="navBarLink" onClick={() => this.handleClick(4)}>
                  <Link className="tabs" to={'/app/community/' + title + '/editprofile'}>
                    <Icon name="paypal" size="big"/>
                  </Link>
                  {(this.props.tab === 4) ?
                    <div className="bar">
                      </div> : null
                    }
                </div>
              </div>

            <div className="navBarLinksRight">
              <a className="tabs" href="/logout">
                <Icon name="log out" />
                Logout</a>
              <Image src={this.props.pictureURL} size="mini" floated="right" style={{height: '50px'}} />
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
