import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';


class Chat extends Component {
  
  render() {

    const { chat } = this.props;
    const { user } = this.props.auth;

    return (
      
        <div>
          chat mult
        </div>
      
    );
  }
}
Chat.defaultProps = {
  showActions: true
};

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { })(Chat);
