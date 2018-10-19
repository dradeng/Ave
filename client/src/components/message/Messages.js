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