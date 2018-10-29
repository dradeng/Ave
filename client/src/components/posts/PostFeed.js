import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
//import Slider, { Range } from 'rc-slider';
//import 'rc-slider/assets/index.css';
class PostFeed extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		min: 0,
  		max: 2500
  	};
  	this.onChange = this.onChange.bind(this);

  }
  
  onChange(e) {

    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
  	

    const { posts } = this.props;

    let newPosts = posts.filter(post => 
      post.rent >= this.state.min && post.rent <= this.state.max
    );

    let feedContent = newPosts.map(post => <PostItem className="col-md-6" key={post._id} post={post} />);
    
    return (
    	<div>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Max price"
                  name="max"
                  value={this.state.max}
                  onChange={this.onChange}
                  
                />
              </div>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Minimum price"
                  name="min"
                  value={this.state.min}
                  onChange={this.onChange}
                  
                />
              </div>
            
    		<div className="row">
    		{feedContent}
            </div>
    	</div>
    );
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
