/**
 * Created by ebadgio on 7/20/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import css from './Directory.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Image } from 'semantic-ui-react';


class DeckCard extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  findCurrentWork() {
    let found = null;
    this.props.user.works.forEach((work) => {
      if (work.isCurrent) {
        found = work;
      }
    });
    return found;
  }

  handleClick() {
    // this.props.updateClicked(this.props.index);
  }

  render() {
    return (
      <Card className="Card">
        <Card.Content>
          <Image floated="left"
                 size="mini"
                 src="https://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg" />
          <Card.Header>
              {/* {this.props.user.name}*/}
              Eli Badgio
          </Card.Header>
          <Card.Meta className="Meta">
              {/* <p>{this.props.user.education.colleges[0]}</p>*/}
              {/* <p>{() => this.findCurrentWork()}</p>*/}
            Rice University
            <br></br>
            Works at Facebook
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}



DeckCard.propTypes = {
  user: PropTypes.object
};


export default DeckCard;

