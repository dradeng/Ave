import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import MessageFeed from './MessageFeed';
import { getMessages } from '../../actions/messageActions';

class Messages extends Component {
  componentDidMount() {
    this.props.getMessages();
  }
  render() {

    return (
      <div>
        <MessageFeed />
        <MessageForm />
      </div>
    );
  }
}

export default Messages;
