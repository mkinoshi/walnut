import React from 'react';
import PropTypes from 'prop-types';
import Contact from '../containers/info/Contact';
import About from '../containers/info/About';
import Links from '../containers/info/Links';
import Projects from '../containers/info/Projects';
import Interests from '../containers/info/Interests';

class Info extends React.Component {

  render() {
    return (
      <div>
        <h1>Info</h1>
        <About />
        <Contact />
        <Links />
        <Projects />
        <Interests />
      </div>
    );
  }
}

Info.propTypes = {
};

export default Info;
