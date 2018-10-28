import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';

class ChatFeed extends Component {
  render() {
    const { chats } = this.props;
    
    return chats.map(chat => <Chat key={chat._id} chat={chat} />);
  }
}

ChatFeed.propTypes = {
  chats: PropTypes.array.isRequired
};

export default ChatFeed;
