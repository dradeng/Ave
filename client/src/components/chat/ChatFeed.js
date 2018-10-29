import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';

class ChatFeed extends Component {
  render() {
    const { chats, chatId } = this.props;
    
    return chats.map(chat => 
    	<div>
    		<Chat key={chat._id} chat={chat} chatId={chatId} />
    	</div>
    );
  }
}

ChatFeed.propTypes = {
  chats: PropTypes.array.isRequired,
  chatId: PropTypes.string.isRequired
};

export default ChatFeed;
