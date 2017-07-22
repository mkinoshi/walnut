// renders in App
import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// TODO navbar links to react routes
// TODO navbar
const styles = {
  links: {
    color: '#FFFFFF',
    fontFamily: 'Apple Symbols',
    fontSize: '2.1rem',
    margin: '7px 30px 7px, 30px'
  },
  ribbon: {
    backgroundColor: '#0D9ED3',
    position: 'fixed',
    top: '0px',
    height: '7%'
  }
};

class Navbar extends React.Component {

  render() {
    return (
      <div className="navbar-fixed">
        <nav style={styles.ribbon}>
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li><Link to="/app"><img src={this.props.community.icon} style={{maxHeight: '50px', maxWidth: '50px', margin: '7px 15px 7px 30px'}}/></Link></li>
              <li><Link to="/app/directory" style={styles.links}>Directory</Link></li>
              <li><Link to="/app/projects" style={styles.links}>Projects</Link></li>
              <li><Link to="/app/map" style={styles.links}>Map</Link></li>
              <li><Link to="/app/editprofile" style={styles.links}>Edit</Link></li>
            </ul>
            <a href="#" className="brand-logo center"><img src="http://i.imgur.com/TbhIBEJ.png" style={{maxHeight: '50px', margin: '7px 15px 7px 30px'}} /></a>
            <a href="/logout">logout</a>
            <div className="right col s8">
              <div className="left input-field s6">
                <i className="small material-icons prefix">search</i>
                <input id="icon_search" type="tel" className="validate" />
                <label htmlFor="icon_search" style={{color: 'white'}}>Search</label>
              </div>
              <div className="right col s2" style={{margin: '7px 30px 7px 30px'}}>
                <img src={this.props.pictureURL} style={{maxHeight: '50px', borderRadius: '45%'}} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  pictureURL: PropTypes.string,
  community: PropTypes.object
};

const mapStateToProps = (state) => ({
  pictureURL: state.userReducer.pictureURL,
  community: state.getCommunityReducer.currentCommunity
});

const mapDispatchToProps = () => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
