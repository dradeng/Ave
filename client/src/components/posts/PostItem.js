import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import Month from '../availability/Month';

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
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
        <div>
      <img className="img-responsive" style={{borderRadius: 5}} src={item} />
        </div>)
    );
    let endDateContent = null;
    if(post.endDate != null && post.endDate.length > 1){
      endDateContent = <Month period="end" month={post.endDate}/>
    }

      return (
          <div style={{border: 'none', backgroundColor: '#FFFFFF'}} className="card card-body mb-3 col-md-6">

            <div style={{float: 'left',position: 'relative'}}>
                <Carousel showThumbs={false}  showIndicators={false} showStatus={false}>
                    {allImage}
                </Carousel>
                
                <div className="row" style={{position: 'absolute', top: 0, right: 20, }}>
                  <Month period="start" month={post.startDate}/>
                  {endDateContent}
                </div>
            </div>

            <div className="row">
                  <div className="col-md-2">
                      <a href="profile.html">
                          <img
                              className="rounded-circle d-none d-md-block"
                              src={post.avatar}
                              alt=""
                          />
                      </a>
                      <br/>
                      <p style={{fontSize: 7}} className="text-center">{post.name}</p>

                  </div>
                  <div className="col-md-10">
                      <div className="row">
                          <p className="lead col-md-10">{post.title}</p>
                          <p className="lead col-md-10">{post.rent}</p>

                      </div>


                      {showActions ? (
                          <span>
                <button
                    onClick={this.onLikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                >
                  <i
                      className={classnames('fas fa-thumbs-up', {
                          'text-info': this.findUserLike(post.likes)
                      })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                    onClick={this.onUnlikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down"/>
                </button>

                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>

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
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
