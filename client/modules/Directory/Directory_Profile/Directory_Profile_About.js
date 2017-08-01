/**
 * Created by ebadgio on 7/29/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import css from '.././Directory.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Image } from 'semantic-ui-react';



class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="About">
            <h1> About </h1>
        </div>
    );
  }
}

About.propTypes = {
  user: PropTypes.object
};

export default About;
