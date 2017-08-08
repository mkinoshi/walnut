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
            <Image className="cardImage" src={this.props.picture} />
            <Card.Content>
                <Card.Header className="directoryHeader">
                    {this.props.name}
                </Card.Header>
                <Card.Meta className="directoryMeta">
                    <span>
                        <Icon name="student" />
                      {this.props.school}
                    </span>
                    <br />
                    <span>
                        <Icon name="travel" />
                      {this.props.job}
                    </span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name="user" />
                    {this.props.email}
                </a>
            </Card.Content>
        </Card>
    );
  }
}


DirectoryCard.propTypes = {
  picture: PropTypes.string,
  name: PropTypes.string,
  school: PropTypes.string,
  job: PropTypes.string,
  email: PropTypes.string
};


export default DirectoryCard;
