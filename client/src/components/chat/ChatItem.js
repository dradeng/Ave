import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { addMessage, getChat } from '../../actions/chatActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class ChatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      newMessages: [],
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getChat(this.props.match.params.id);

  } 
  setMessage = (message) => {
    var key = require('uuid/v4');
    var newArr = this.state.newMessages[key] = message;
    this.setState({ newMessages: newArr });
  }
  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { chatId } = this.props;
    const { chat } = this.props.chat;

    const newMessage = {
      content: this.state.content,
      sender: user.id,
      date: Date.now
    };

    const socket = openSocket('http://localhost:5000');//NEED TO NOT HARD CODE THIS
    console.log('EMITE' + newMessage);
    socket.emit('addMessage', newMessage); // change 'red' to this.state.color


    this.props.addMessage(chat._id, newMessage);
    this.props.getChat(this.props.match.params.id);
    this.setState({ content: '' });
    this.setState({ newMessages: []});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {

    const { chat, loading } = this.props.chat;
    const { user } = this.props.auth;
    

    const socket = openSocket('http://localhost:5000');//NEED TO NOT HARD CODE THIS
    socket.on('addMessage', (message) => {
      console.log('NEW RENDER RECIEVED ON client ');
      console.log(message);
      console.log('NEW MESSAGE'+message);
      
      this.setMessage(message);

    });


    let messageContent;
    let socketMessagesContent;
    if (chat === null || loading || Object.keys(chat).length === 0) {
      messageContent = <Spinner />;
    }
    else {
      messageContent = chat.messages.map(
        message => 
        { 
          if (user.id == message.sender)
          {
            return <p key={message._id} align="left" > {message.content} </p> 
          }
          else{
            return <p key={message._id} align="right" > {message.content} </p> 
          }
        }
      );
    }
    console.log('SOCKET CONTENT '+this.state.newMessages);
    socketMessagesContent = Object.keys(this.state.newMessages).map((key) =>
      { 
        /*if (user.id == this.state.newMessages[key].sender)
        {
          return <p key={key} align="left"> {this.state.newMessages[key]}.content </p> 
        }
        else {
          return <p key={key} align="right"> {this.state.newMessages[key]}.content </p> 
        }*/
        return <p>WHATS UP{this.state.newMessages[key]}</p>
      }
    );
    console.log('socketMessagesContent');
    console.log(socketMessagesContent);
    return (
      
        <div>
      
          User1: {chat.user1}
          <br />
          User2: {chat.user2}
          <br />
          Messages:
          <br />
          {messageContent}
          SPLITTTTTTTT
          {socketMessagesContent}
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
