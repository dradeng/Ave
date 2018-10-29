import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import Filter from './filter/Filter';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
//import Slider, { Range } from 'rc-slider';
//import 'rc-slider/assets/index.css';
class PostFeed extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		min: 0,
  		max: 2500,
        showFilter: false,
  	};
  	this.onChange = this.onChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
  }
  
  onChange(e) {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  }
  onPriceChange(min,max)
  {
      this.setState({ min: min, max: max });
  }
  render() {
  	

    const { posts } = this.props;

    let newPosts = posts.filter(post => 
      post.rent >= this.state.min && post.rent <= this.state.max
    );

    let feedContent = newPosts.map(post => <PostItem className="col-md-6" key={post._id} post={post} />);
    
    return (
    	<div>
            {this.state.showFilter ?   <div> <Filter priceChange={this.onPriceChange}/> <button onClick={() => this.setState({showFilter: false})}>
                Filter
                </button>
                </div>:
            <button onClick={() => this.setState({showFilter: true})}>
                Filter
            </button>}

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
