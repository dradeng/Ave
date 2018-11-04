import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import { addChat } from '../../actions/chatActions';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user1: null,
      user2: null,
      user1Name: '',
      user2Name: '',
      messages: []
    };
    this.createChat = this.createChat.bind(this);
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  createChat(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { post } = this.props.post;

    const newChat = {
      
      user1: user.id,
      user2: post.user,
      user1Name: user.name,
      user2Name: post.name,
      messages: []
      
    };
  
    this.props.addChat(newChat);
    this.setState({ user1: null });
    this.setState({ user2: null });
    this.setState({ user1Name: '' });
    this.setState({ user2Name: '' });
    this.setState({ messages: [] });
    
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
              <button onClick={this.createChat}>
                <Link to="/chats">Message</Link>
              </button>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  addChat: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  chat: state.chat,
});

export default connect(mapStateToProps, { getPost, addChat })(Post);
