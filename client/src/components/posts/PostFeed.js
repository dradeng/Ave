import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

import PostItem from './PostItem';
import Filter from './filter/Filter';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
//import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import MonthGrid from "./filter/MonthGrid";
const createSliderWithTooltip = Slider.createSliderWithTooltip;

const Range = createSliderWithTooltip(Slider.Range);

class PostFeed extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		min: 0,
  		max: 2500,
        showFilter: false,
        showStartDate: false,
        showEndDate: false,
        showPriceTool: false,
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
    console.log(posts);
    let newPosts = posts.filter(post => 
      post.rent >= this.state.min && post.rent <= this.state.max
    );

    let feedContent = newPosts.map(post => <PostItem className="col-md-6" key={post._id} post={post} />);
    
    return (
    	<div>
            <div style={{ borderBottom: '1px solid #eeedf1', padding: 10, paddingLeft: 50}} className="row">

                {this.state.showPriceTool ?
                    <div>
                        <button className="filterButton" onClick={() => this.setState({showPriceTool: false})}>
                            <span style={{padding: 2, paddingTop: 6, paddingBottom: 6}}>  Price </span>
                        </button>
                        <div  className="filterPopUp" >
                        <Range  style={{
                            padding: 10,
                            width: 200
                        }}   tipTransitionName='rc-slider-tooltip-zoom-down' onChange={(evt) => this.onPriceChange(evt[0], evt[1])}  defaultValue={[0, 5000]} max={5000}  min={0}/>
                            <span> ${this.state.min} , ${this.state.max}  </span>


                        </div>
                    </div> :
                    <div>
                        <button className="filterButtonSelected" onClick={() => this.setState({showPriceTool: true})}>
                            <span style={{padding: 2, paddingTop: 6, paddingBottom: 6}}>  Price </span>
                        </button>

                    </div>
                }
                {this.state.showStartDate ?   <div>  <button className="filterButton" onClick={() => this.setState({showStartDate: false})}>
                        <span style={{padding: 2,paddingTop: 6, paddingBottom: 6}}> Start </span>
                    </button>
                    <div className="filterPopUp">
                        <MonthGrid/>
                    </div>
                    </div>:
                    <button className="filterButtonSelected"  onClick={() => this.setState({showStartDate: true,showPriceTool: false,showEndDate: false})}>
                        <span style={{padding: 2,paddingTop: 6, paddingBottom: 6}}> Start </span>
                    </button>}
                {this.state.showEndDate ?   <div>  <button className="filterButton" onClick={() => this.setState({showEndDate: false})}>
                        <span style={{padding: 2,paddingTop: 6, paddingBottom: 6}}> End </span>
                    </button>
                        <div className="filterPopUp">
                            <MonthGrid/>
                        </div>
                    </div>:
                    <button className="filterButtonSelected"  onClick={() => this.setState({showEndDate: true,showPriceTool: false, showStartDate: false})}>
                        <span style={{padding: 2,paddingTop: 6, paddingBottom: 6}}> End </span>
                    </button>}
                {this.state.showFilter ?   <div>  <button className="filterButton" onClick={() => this.setState({showFilter: false})}>
                        <span style={{padding: 2,paddingTop: 6, paddingBottom: 6}}> More </span>
                    </button>
                    </div>:
                    <button className="filterButtonSelected"  onClick={() => this.setState({showFilter: true,showPriceTool: false,showStartDate: false,showEndDate: false})}>
                        <span style={{padding: 2,paddingTop: 6, paddingBottom: 6}}> More </span>
                    </button>}


            </div>
    		<div className="row">
                {this.state.showFilter && <Filter priceChange={this.onPriceChange}/> }

                {!this.state.showFilter && feedContent}
            </div>
    	</div>
    );
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
