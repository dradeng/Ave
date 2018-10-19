import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';


class Message extends Component {
  
  render() {

    const {message} = this.props;
    const { user } = this.props.auth;

    let messageStyle;
    console.log(message.user)
    console.log(user.id)
    if( message.user === user.id) {
      messageStyle = <div align="right">{message.content}</div>
    } else {
      messageStyle = <div align="left">{message.content}</div>
    }


    return (
      
        <div>
          {messageStyle}
        </div>
      
    );
  }
}
Message.defaultProps = {
  showActions: true
};

Message.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { })(
  Message
);
