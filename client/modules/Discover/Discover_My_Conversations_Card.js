import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import './Discover.css';
import Linkify from 'linkifyjs/react';
import ModalContainer from '../Post/Post_Modal_Container';

const defaults = {
  attributes: null,
  className: 'linkified',
  defaultProtocol: 'http',
  events: null,
  format: (value) => {
    return value;
  },
  formatHref: (href) => {
    return href;
  },
  ignoreTags: [],
  nl2br: false,
  tagName: 'a',
  target: {
    url: '_blank'
  },
  validate: true
};

class ConversationCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('card content', this.props.data);
    return (
        <div className="myConversationCard">
            <p>conversation card</p>
            <Card>
              <Card.Content className="conversationCardContent">
                <div className="conversationCardHeader">
                  <div className="conversationCardWrapper">
                    <img className="conversationCardUserImage" src={this.props.data.pictureURL} />
                  </div>
                    <h3 className="conversationCardHeaderUser">{this.props.data.username}</h3>
                </div>
                <Linkify className="conversationCardBody" tagName="p" options={defaults}>{this.props.data.content}</Linkify>
                <div className="tagContainer">
                  {this.props.data.tags.map((tag, index) => (
                    <div key={index} className="tag">
                      <text className="hashtag">#{tag.name}</text>
                    </div>))}
                </div>
                <ModalContainer postData={this.props.data} currentUser={this.props.user} />
              </Card.Content>
            </Card>
        </div>
        );
  }
}

ConversationCard.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object
};

export default ConversationCard;


