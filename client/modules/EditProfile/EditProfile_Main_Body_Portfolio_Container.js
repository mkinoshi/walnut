import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';
import Uploads from '../../containers/Uploads';

const styles = {
  portfolio: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  }
};

class Portfolio extends React.Component {

  render() {
    return (
      <div style={styles.portfolio}>
        <h2>Portfolio</h2>
        <p><Link to="/app/editprofile" style={styles.links}>media</Link></p>
        <p><Link to="/app/editprofile/portfolio/documents" style={styles.links}>documents</Link></p>
        <p><Link to="/app/editprofile/portfolio/code" style={styles.links}>code</Link></p>
        <p><Link to="/app/editprofile/portfolio/design" style={styles.links}>design</Link></p>
        <Switch>
          <Route exact path="/app/editprofile/portfolio/documents" render={(props) =>
            <Uploads file={'documents'} {...props}/>
          }/>
          <Route exact path="/app/editprofile/portfolio/code" render={(props) =>
            <Uploads file={'code'} {...props}/>
          }/>
          <Route exact path="/app/editprofile/portfolio/design" render={(props) =>
            <Uploads file={'design'} {...props}/>
          }/>
          <Route path="/app/editprofile" render={(props) =>
            <Uploads file={'media'} {...props}/>
          }/>
        </Switch>
      </div>
    );
  }
}

Portfolio.propTypes = {
};

export default Portfolio;
