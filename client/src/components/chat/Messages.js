import React, { Component } from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');


class Messages extends Component {
	constructor(props) {
  		super(props);
  		this.state = {
      		message: '',
      		user: null,
      		date: null
    	};
	}

	render() {
  		return (
    		<div>
    			Nothing to look at
    		</div>
  );
}
}

export default Messages;
