import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { addMessage } from '../../actions/chatActions';


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { chatId } = this.props;
    const { chat } = this.props;

    const newMessage = {
      content: this.state.content,
    };

    this.props.addMessage(chat._id, newMessage);
    this.setState({ content: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {

    const { chat } = this.props;
    const { user } = this.props.auth;

    return (
      
        <div>
          User1:
          {chat.user1}<br />
          User2:
          {chat.user2}<br />
          Messages:
          {chat.messages}<br />
          <form onSubmit={this.onSubmit}>
            <input type="text" name="message" /><br />
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      
    );
  }
}
Chat.defaultProps = {
  showActions: true
};

Chat.propTypes = {
  addChat: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  chatId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addMessage })(Chat);
