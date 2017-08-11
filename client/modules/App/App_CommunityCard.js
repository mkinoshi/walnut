/**
 * Created by ebadgio on 8/10/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import css from './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Card, Button, Icon, Image } from 'semantic-ui-react';


class CommunityCard extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  handleClick() {
        // this.props.updateClicked(this.props.index);
  }

  render() {
    if (this.props.joined) {
      return (
          <Card className="communityCard">
              <Image className="communityCardImage" src={this.props.icon} />
              <Card.Content className="communityCardContent">
                  <Card.Header className="communityHeader">
                      {this.props.title}
                  </Card.Header>
              </Card.Content>
          </Card>
      );
    }
    return (
      <Card className="communityCard">
          <Image className="communityCardImage" src={this.props.icon} />
          <Card.Content className="communityCardContent">
              <Card.Header className="communityHeader">
                  {this.props.title}
              </Card.Header>
          </Card.Content>
          <Card.Content extra>
              <Button className="joinButton" onClick={() => this.props.join(this.props.communityId)} content="Join" icon="plus" labelPosition="left"/>
          </Card.Content>
      </Card>
    );
  }
}


CommunityCard.propTypes = {
  joined: PropTypes.boolean,
  icon: PropTypes.string,
  title: PropTypes.string,
  join: PropTypes.func,
  communityId: PropTypes.string
};


export default CommunityCard;
