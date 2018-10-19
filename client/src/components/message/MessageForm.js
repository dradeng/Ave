import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addMessage } from '../../actions/messageActions';




class MessageForm extends Component {
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

  onChange(e) {

    this.setState({ [e.target.name]: e.target.value });
 
  }
  onSubmit(e) {
    e.preventDefault();


    const { user } = this.props.auth;

    const newMessage = {
      content: this.state.content,
    };

    this.props.addMessage(newMessage);
    this.setState({ content: '' });

  }
	render() {

    const { errors } = this.state;


		return (
  		<div>

        <div>

        </div>


  			<form onSubmit={this.onSubmit} method="POST" enctype="multipart/form-data">
          
          <div className="form-group">
            <TextAreaFieldGroup
              placeholder="What do you want to say?"
              name="content"
              value={this.state.content}
              onChange={this.onChange}
              error={errors.message}
            />
          </div>

          <button type="submit" className="btn btn-dark">
            Send
          </button>
        </form>
  		</div>
    );
  }
}

MessageForm.propTypes = {
  addMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(mapStateToProps, { addMessage })(MessageForm);
