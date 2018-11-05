import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import WhiteShed from '../../assets/whiteshed.png';


class Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    let options = [
      {
        text: 'Profile',
        value: 'Profile',
      },
      {
        text: 'Logout',
        value: 'Logout',
      },
    ];
    const authLinks = (
      <ul style={{paddingBottom: '5%',paddingLeft:'5%'}} className="navbar-nav">
        <li className="nav-item navbarItem">
            <Link className="nav-link" to="/sublet">
                <span style={{color: '#FFFFFF'}}>Post a Sublet</span>
            </Link>
        </li>
        <li  className="nav-item navbarItem">
          <Link className="nav-link" to="/feed">
              <span style={{color: '#FFFFFF'}}> Sublets </span>
          </Link>
        </li>
        <li className="nav-item navbarItem">
            <Link className="nav-link" to="/favorites">
                <span style={{color: '#FFFFFF'}}>Favorites</span>
            </Link>
        </li>
        <li className="nav-item navbarItem">
            <Link className="nav-link" to="/chats">
                <span >Messages</span>
            </Link>
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
        <div className="row">
            <nav style={{height: 70, backgroundColor: '#03eec2'}}
                 className="navbar navbar-expand-sm navbar-dark  mb-4 col-md-10">
                <img style={{width: 40, marginLeft: '3%'}} src={WhiteShed}/>

                <div className="container">
                    <Link className="navbar-brand" to="/">
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
            <nav style={{color: '#a0aabe'}} className="col-md-2">
                <div className="nav-item">
                    <span className="nav-link">
                 <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle style={{backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0}}>
                 <img
                     className="rounded-circle"
                     src={user.profilePic}
                     alt={user.name}
                     style={{width: '25px', marginRight: '5px'}}
                     title="You must have a Gravatar connected to your email to display an image"
                 />
                  </DropdownToggle>
              <DropdownMenu>
                  <DropdownItem>
                      <Link to="/dashboard">
                          Profile
                      </Link>
                  </DropdownItem>
                  <DropdownItem>
                      <a
                          href=""
                          onClick={this.onLogoutClick.bind(this)}
                          className="nav-link"
                      >
                          <span style={{color: 'Blue'}}>Logout</span>
                      </a>
                  </DropdownItem>
              </DropdownMenu>
              </Dropdown>
  </span>
                </div>
            </nav>
        </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
    curPath: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
