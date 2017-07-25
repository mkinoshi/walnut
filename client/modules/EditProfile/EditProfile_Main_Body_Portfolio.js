import React from 'react';
import PropTypes from 'prop-types';
import Uploads from './EditProfile_Main_Body_Portfolio_Uploads_Container';

const styles = {
  portfolio: {
    backgroundColor: 'lightblue',
    width: '65%',
    paddingLeft: '2%'
  },
  links: {
    display: 'flex',
    justifyContent: 'space-around',
  }
};

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'media',
      currUrl: ''
    };
  }

  tabChange(tab) {
    this.setState({tab: tab, currUrl: ''});
  }

  renderFile(url) {
    console.log('renderfile toggle state', this.state.currUrl);
    if(this.state.currUrl === url) {
      console.log('in here');
      this.setState({currUrl: ''});
    } else{
      this.setState({currUrl: url});
    }
  }

  render() {
    // TODO currUrl needs to deploy modal to show all file types and not just image
    return (
      <div style={styles.portfolio} className="row col-xs-12">
        <h2>Portfolio</h2>
        <div style={styles.links}>
          <p onClick={()=> (this.tabChange('media'))}>Media</p>
          <p onClick={()=> (this.tabChange('documents'))}>Documents</p>
          <p onClick={()=> (this.tabChange('code'))}>Code</p>
          <p onClick={()=> (this.tabChange('design'))}>Design</p>
        </div>
        {(this.state.currUrl !== '') ? <img style={styles.pic} src={this.state.currUrl} /> : <p></p>}
        <Uploads
        tab={this.state.tab}
        renderFile={(url) => (this.renderFile(url))}/>
      </div>
    );
  }
}

Portfolio.propTypes = {
};

export default Portfolio;
