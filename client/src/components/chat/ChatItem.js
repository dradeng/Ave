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
      count: 0,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getChat(this.props.match.params.id);

  }
  send = () => {
    const socket = openSocket('http://localhost:5000');//NEED TO NOT HARD CODE THIS
    console.log('EMITE' + this.state.count);
    socket.emit('change color', this.state.count); // change 'red' to this.state.color
  }
  // adding the function
  setColor = (count) => {
    this.setState({ count })
  }
  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { chatId } = this.props;
    const { chat } = this.props.chat;

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

    const { chat, loading } = this.props.chat;
    const { user } = this.props.auth;
    

    const socket = openSocket('http://localhost:5000');//NEED TO NOT HARD CODE THIS
    socket.on('change color', (count) => {
      console.log('RENDER ' + count);
      this.setColor(count);
    });


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
          
          {this.state.count}

          <button onClick={() => this.send() }>Change Color</button>
          <button id="blue" onClick={() => this.setColor(1)}>Uno</button>
          <button id="red" onClick={() => this.setColor(2)}>Dos</button>



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
