import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PostItem from "../posts/PostItem";
import { getCurrentProfile } from '../../actions/profileActions';

class Favorites extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let favoritesContent;
    console.log('LAAAAME');
    console.log(profile);
    if (profile === null || loading) {
      favoritesContent = <Spinner />;
    } else {
        favoritesContent = profile.favorites.map(post => <p>ONE </p>);
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Favorites</h1>
              {favoritesContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(
  Favorites
);