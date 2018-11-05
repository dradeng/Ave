import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import { addFavorite, getCurrentProfile } from '../../actions/profileActions';
import Month from '../availability/Month';

class PostItem extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }
  //this covers removing and adding favorite
  onFavorite(userID, postID) {
   
    const { profile, loading } = this.props.profile;

    const newFavorite = {
      favorites: postID,
    };

    if(loading || profile == null)
    {
      //do nothing
    } else {
      console.log('MADE IR');
      this.props.addFavorite(userID, newFavorite);
    }

  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    const allImage = post.images.map((item, index) => (
        <div style={{width:'100%',overflow:'hidden'}}>
      <img className="img-responsive" style={{borderRadius: 5}} src={item} />
        </div>)
    );
    let endDateContent = null;
    if(post.endDate != null && post.endDate.length > 1){
      endDateContent = <Month period="end" month={post.endDate}/>
    }

      return (
          <div className="card card-body mb-3 col-md-6 feedTile">
            <div className="row">
                  <div className="col-md-2">
                      <a href="profile.html">
                          <img
                              className="rounded-circle d-none d-md-block postImage"
                              src={post.avatar}
                              alt=""
                          />
                      </a>
                      <br/>

                  </div>
                  <div className="col-md-10">
                      <div  className="row">
                          <p className="lead col-md-10">{post.title}</p>
                          <div style={{color: '#fac71e'}}  onClick={this.onFavorite.bind(this, auth.user.id, post._id)}>
                          <i  className="fas fa-star"/>
                          </div>
                      </div>


                      {showActions ? (
                          <span>



                              {post.user === auth.user.id ? (
                                  <button
                                      onClick={this.onDeleteClick.bind(this, post._id)}
                                      type="button"
                                      className="btn btn-danger mr-1"
                                  >
                                      <i className="fas fa-times"/>
                                  </button>
                              ) : null}
              </span>
                      ) : null}

                  </div>

              </div>
              <div style={{float: 'left',position: 'relative', display:'flex', }}>
                  <Carousel style={{height:'40%'}} showThumbs={false}  showIndicators={false} showStatus={false}>
                      {allImage}
                  </Carousel>

                  <div className="row" style={{position: 'absolute', top: 0, right: 20,}}>
                      <Month period="start" month={post.startDate}/>
                      {endDateContent}
                  </div>
                  <div className="row" style={{position: 'absolute', bottom: 20, left: 25, color: '#FFFFFF'}}>
                      <i className="fas fa-dollar-sign"/>

                      <p className="priceTag">{post.rent}</p>

                  </div>

              </div>

          </div>
      );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike, addFavorite, getCurrentProfile })(
  PostItem
);
