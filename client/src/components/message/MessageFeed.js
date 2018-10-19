import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

class MessageFeed extends Component {
  render() {
    const { messages } = this.props;

    return messages.map(message => <Message key={message._id} message={message} />);
  }
}

MessageFeed.propTypes = {
  messages: PropTypes.array.isRequired
};

export default MessageFeed;
