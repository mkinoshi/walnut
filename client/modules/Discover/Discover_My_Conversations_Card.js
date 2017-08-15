import React from 'react';
import PropTypes from 'prop-types';
import { } from 'semantic-ui-react';
import './Discover.css';

class ConversationCard extends React.Component {
  render() {
    return (
        <div className="myConversationCard">
            <p>conversation card</p>
        </div>
        );
  }
}

ConversationCard.propTypes = {
  data: PropTypes.object
};

export default ConversationCard;


