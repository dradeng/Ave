import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addChat } from '../../actions/chatActions';


const socket = openSocket('http://localhost:3000');



class Messages extends Component {
	constructor(props) {
  		super(props);
  		this.state = {
      		message: '',
    	};

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
	}
  onChange(e) {

    this.setState({ [e.target.name]: e.target.value });
 
  }
  onSubmit(e) {
    e.preventDefault();

    const newMessage = {
      message: this.state.message,
    };

    this.props.addChat(newMessage);
    this.setState({ message: '' });

  }
	render() {

    socket.on('connect', function() {
      console.log('connected to server from react');

      socket.emit("11", {
        playerID: 2,
        otherVariable:1
      }); 
      console.log('past emit');
    });
    socket.on('disconnect', function () {
      console.log('disconnected from server')
    });

		return (
  		<div>
  			<form onSubmit={this.onSubmit} method="POST" enctype="multipart/form-data">
          <input value={this.state.address} onChange={this.onChange} name="message" type="text" placeholder="Message" />
          <button type="submit" className="btn btn-dark">
            Send
          </button>
        </form>
  		</div>
    );
  }
}

Messages.propTypes = {
  addChat: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addChat })(Messages);
