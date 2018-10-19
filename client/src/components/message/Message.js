import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';


class Message extends Component {
  
  render() {

    const {message} = this.props;

    return (
      
        <div>
          {message.content}
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
