import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageForm from './MessageForm';

class Messages extends Component {

  render() {

    return (
      <div>
        <MessageForm />
      </div>
    );
  }
}

export default Messages;
