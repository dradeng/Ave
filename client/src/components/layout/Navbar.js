import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import AveLogo from '../../assets/AveLogo.png';


class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul  className="navbar-nav ml-auto">
        <li  className="nav-item">
          <Link className="nav-link" to="/feed">
              <span style={{color: '#B4B4B4'}}> Post Feed </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
              <span style={{color: '#B4B4B4'}}>Dashboard</span>
          </Link>
        </li>
          <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                  <span style={{color: '#B4B4B4'}}>Favorites</span>
              </Link>
          </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
              <span style={{color: '#B4B4B4'}}> Logout </span>
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
              <span style={{color: '#B4B4B4'}}>Sign Up </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
              <span style={{color: '#B4B4B4'}}> Login </span>
          </Link>
        </li>
      </ul>
    );

    return (
      <nav style={{backgroundColor: '#ffffff', boxShadow: '0 8px 16px #eee'}} className="navbar navbar-expand-sm navbar-dark  mb-4">
          <img style={{width: 40}} src={AveLogo}/>

          <div className="container">
          <Link className="navbar-brand" to="/">
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                    <span style={{color: '#B4B4B4'}}> Profiles </span>
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
