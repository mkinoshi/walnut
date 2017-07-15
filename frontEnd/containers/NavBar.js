// renders in App
import React from 'react';

// TODO navbar links to react routes
// TODO navbar
const styles = {
  links: {
    color: '#FFFFFF',
    fontFamily: 'Apple Symbols',
    fontSize: '2.1rem',
    margin: '7px 30px 7px, 30px'
  }
};

class Navbar extends React.Component {

  render() {
    return (
      <div>
        <nav style={{backgroundColor: '#0D9ED3', position: 'fixed', top: '0px'}}>
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li><img src="http://i.imgur.com/EBNhMdD.png" style={{maxHeight: '50px', maxWidth: '50px', margin: '7px 15px 7px 30px'}}/></li>
              <li><a href="sass.html" style={styles.links}>Alumni</a></li>
              <li><a href="badges.html" style={styles.links}>Projects</a></li>
              <li><a href="collapsible.html" style={styles.links}>Map</a></li>
            </ul>
            <a href="#" className="brand-logo center"><img src="http://i.imgur.com/TbhIBEJ.png" style={{maxHeight: '50px', margin: '7px 15px 7px 30px'}} /></a>
          <div className="right col s8">
              <div className="left input-field s6">
                <i className="small material-icons prefix">search</i>
                <input id="icon_search" type="tel" className="validate" />
                <label htmlFor="icon_search" style={{color: 'white'}}>Search</label>
              </div>
              <div className="right col s2" style={{margin: '7px 30px 7px 30px'}}>
                <img src="http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg" style={{maxHeight: '50px', borderRadius: '45%'}} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
