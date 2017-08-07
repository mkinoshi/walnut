/**
 * Created by ebadgio on 8/3/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import css from './Directory2.css';
import 'semantic-ui-css/semantic.min.css';
import { Card, Icon, Image } from 'semantic-ui-react';


class DirectoryCard extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  handleClick() {
        // this.props.updateClicked(this.props.index);
  }

  render() {
    return (
        <Card className="directoryCard">
            <Image classname="cardImage" src="http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg" />
            <Card.Content>
                <Card.Header className="directoryHeader">
                    Eli Badgio
                </Card.Header>
                <Card.Meta className="directoryMeta">
                    <span>
                        <Icon name="student" />
                      Rice University class of 2019
                    </span>
                    <br />
                    <span>
                        <Icon name="travel" />
                      Works as a software engineer at Facebook
                    </span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name="user" />
                    Some extra detail/action
                </a>
            </Card.Content>
        </Card>
    );
  }
}


DirectoryCard.propTypes = {
  user: PropTypes.object
};


export default DirectoryCard;
