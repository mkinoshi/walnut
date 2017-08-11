/**
 * Created by ebadgio on 7/29/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import css from '.././Directory.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Image } from 'semantic-ui-react';



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Card className="Header">
            <Card.Content>
                <Image floated="left"
                       size="small"
                       src="https://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg" />
                <Card.Header>
                    Eli Badgio
                </Card.Header>
            </Card.Content>
        </Card>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object
};

export default Header;
