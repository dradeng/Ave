import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addChat } from '../../actions/chatActions';




class MessageForm extends Component {
	constructor(props) {
  		super(props);
  		this.state = {
      		message: '',
    	};

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
	}
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
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

		return (
  		<div>

        <div>

        </div>


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

MessageForm.propTypes = {
  addChat: PropTypes.func.isRequired,
};



export default connect(null, { addChat })(MessageForm);
