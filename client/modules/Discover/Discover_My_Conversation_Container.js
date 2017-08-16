import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConversationCard from './Discover_My_Conversations_Card';
import {  } from 'semantic-ui-react';
import './Discover.css';

class MyConversationContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      };
  }

  render() {
    return (
        <div className="myConversationBox">
            <p>conversation box with infinite scroll</p>
            {/* {this.props.currentConversations.map((conv) =>
              <ConversationCard data={conv} />
            )} */}
        </div>
        );
  }
}

MyConversationContainer.propTypes = {
  currentConversations: PropTypes.array
};

const mapStateToProps = (state) => ({
  currentConversations: state.userReducer.currentConversations
});

export default connect(mapStateToProps)(MyConversationContainer);


