import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import MessageFeed from './MessageFeed';
import { getMessages } from '../../actions/messageActions';
import Spinner from '../common/Spinner';

class Messages extends Component {
  componentDidMount() {
    this.props.getMessages();
  }
  render() {

    const { messages, loading } = this.props.message;
    let messageContent;

    if(messages === null || loading) {
      messageContent = <Spinner />;

    } else {
      messageContent = <MessageFeed messages={messages} />;
    }


    return (
      <div>
        {messageContent}
        <MessageForm />

      </div>
    );
  }
}

Messages.propTypes = {
  getMessages: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  message: state.message
});

export default connect(mapStateToProps, { getMessages })(Messages);