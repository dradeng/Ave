import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import InputRange from 'react-input-range';

class PostFeed extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		value: { min: 0, max: 3000},
  	};
  }
  render() {
  	

    const { posts } = this.props;
    let feedContent = posts.map(post => <PostItem className="col-md-6" key={post._id} post={post} />);
    return (
    	<div>
    		<InputRange
    			step={2}
    			formatLabel={value => `${value}dollars`}
    			maxValue={3000}
    			minValue={0}
    			draggableTrack={true}
    			value={this.state.value}
    			onChange={value => this.setState({ value })}/>

    		{feedContent}
    	</div>
    );
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
