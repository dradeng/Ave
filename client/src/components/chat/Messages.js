import React, { Component } from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');


class Messages extends Component {

	render() {
	  	return (
	    	<div>
	    	  NOTHING HERE YET
	    	</div>
	  	);
	};
}

export default Messages;
