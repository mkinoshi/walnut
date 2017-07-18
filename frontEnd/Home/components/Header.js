import React from 'react';
import Quote from '../containers/Quote';
import NewPost from '../containers/NewPost';

// TODO Header content
// TODO Google drive link
// TODO render NewPost

const styles = {
  outer: {
    display: 'flex',
    flexDirection: 'row'
  },
  middle: {
    width: '90%'
  },
  logs: {
    width: '5.5%',
    height: '5.5%',
    marginTop: '3%',
    marginLeft: '3%'
  },
  title: {
    marginTop: '3%',
    width: '90%'
  },
  company: {
    fontSize: '300%',
    marginLeft: '5%',
    letterSpacing: '3px',
    marginTop: '0.5%'
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    width: '10%',
    justifyContent: 'space-around'
  },
  linkLogo: {
    width: '40%',
    height: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: '1%',
    borderRadius: '10%'
  },
  containPost: {
    width: '100%'
  }
};
class Header extends React.Component {

  render() {
    return (
      <div>
        <div style={styles.outer} >
          <img src="http://i.imgur.com/EBNhMdD.png" style={styles.logs}/>
        <div style={styles.middle}>
            <div id="title" style={styles.title}><h1 style={styles.company}>Horizon School Of Technology</h1></div>
            <Quote />
          </div>
          <div style={styles.links}>
            <img style={styles.linkLogo} src="https://www.google.com/drive/static/images/drive/logo-drive.png" />
            <img style={styles.linkLogo} src="http://vannguyen.me/images/githubpurple.png" />
          </div>
        </div>
        <div style={styles.containPost}>
          <NewPost />
        </div>
      </div>
    );
  }
}

export default Header;
