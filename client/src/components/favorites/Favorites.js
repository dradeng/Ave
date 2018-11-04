import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PostItem from "../posts/PostItem";
import PostFeed from '../posts/PostFeed';
import { getCurrentProfile } from '../../actions/profileActions';
import { getPosts } from '../../actions/postActions';


class Favorites extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { posts } = this.props.post; //const { posts, loading } = this.props.post; might need to add loading
    let favoritesContent;
    console.log('LAAAAME');
    console.log(profile);
    if (profile === null || loading) {
      favoritesContent = <Spinner />;
    } else {
        favoritesContent = posts.map(post => { 
            /*if(profile.Favorites.index(post._id)) {
                return <PostItem className="col-md-6" key={post._id} post={post} />
            } else {
                return // nothing
            }
            */
     
        });
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
  getPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, getPosts })(
  Favorites
);