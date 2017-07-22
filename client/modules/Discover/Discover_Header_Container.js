import React from 'react';
import QuoteContainer from './Discover_Quote_Container';
import NewPostContainer from '../Feed/Feed_NewPost_Container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
class HeaderContainer extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    console.log('in Header', this.props.community);
    return (
      <div>
        <div style={styles.outer} >
          <img src={this.props.community.icon} style={styles.logs}/>
        <div style={styles.middle}>
            <div id="title" style={styles.title}><h1 style={styles.company}>{this.props.community.title}</h1></div>
            <QuoteContainer />
          </div>
          <div style={styles.links}>
            <img style={styles.linkLogo} src="https://www.google.com/drive/static/images/drive/logo-drive.png" />
            <img style={styles.linkLogo} src="http://vannguyen.me/images/githubpurple.png" />
          </div>
        </div>
        <div style={styles.containPost}>
          <NewPostContainer />
        </div>
      </div>
    );
  }
}

HeaderContainer.propTypes = {
  community: PropTypes.object
};

const mapStateToProps = (state) => ({
  community: state.getCommunityReducer.currentCommunity
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);


