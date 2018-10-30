import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import { addMessage, getChat } from '../../actions/chatActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';


class ChatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getChat(this.props.match.params.id);
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { chatId } = this.props;
    const { chat } = this.props.chat;

    const newMessage = {
      content: this.state.content,
    };
    console.log('WHATS UP');
    console.log(chat._id);
    this.props.addMessage(chat._id, newMessage);
    this.setState({ content: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {

    const { chat, loading } = this.props.chat;
    const { user } = this.props.auth;
    
    let messageContent;
    if (chat === null || loading || Object.keys(chat).length === 0) {
      messageContent = <Spinner />;
    }
    else {
      messageContent = chat.messages.map(
        message => 
        { 
          if (user.id == message.sender)
          {
            return <p key={message._id} align="left" message={message}> {message.content} </p> 
          }
          else{
            return <p key={message._id} align="right" message={message}> {message.content} </p> 
          }
        }
      );
    }
    return (
      
        <div>
          User1: {chat.user1}
          <br />
          User2: {chat.user2}
          <br />
          Messages:
          <br />
          {messageContent}
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Send Message"
                  name="content"
                  value={this.state.content}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
        </div>
      
    );
  }
}
ChatItem.defaultProps = {
  showActions: true
};

ChatItem.propTypes = {
  addMessage: PropTypes.func.isRequired,
  getChat: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  chatId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
});

export default connect(mapStateToProps, { addMessage, getChat })(ChatItem);
