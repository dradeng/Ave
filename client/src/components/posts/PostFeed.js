import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import PostItem from './PostItem';
import Filter from './filter/Filter';
import 'rc-slider/assets/index.css';
import DatePicker from 'react-datepicker';
import connect from "react-redux/es/connect/connect";
import { updateSelectedPosts} from '../../actions/postActions';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);



class PostFeed extends Component {
  constructor(props) {
  	super(props);
  	let CurrentDate = new Date();

  	if (!props.endDate) {
        CurrentDate.setMonth(CurrentDate.getMonth() + 1);
    }

  	this.state = {
  		min: 0,
  		max: 2500,
        startYear: 2018,
        endYear: 2018,
        startMonth: 11,
        endMonth: 12,
        showFilter: false,
        startDate: new Date(),
        endDate:CurrentDate,
        showStartDate: false,
        showCalendar: false,
        showPriceTool: false,
  	};
  	this.onChange = this.onChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onChangeStartYear = this.onChangeStartYear.bind(this);
    this.onChangeEndYear = this.onChangeEndYear.bind(this);
      this.onChangeStartDate = this.onChangeStartDate.bind(this);
      this.onChangeEndDate = this.onChangeEndDate.bind(this);


  }
  
  onChange(e) {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  }
  onPriceChange(min,max)
  {
        let newPosts = [];
      if (this.props.selectedPosts.length === 0)
      {
          newPosts = this.props.posts.filter(post =>
              post.rent >= min && post.rent <= max &&  new Date(this.state.startDate).getTime() <= (new Date(post.startDate).getTime() + 12096e5));
      }
      else {
          newPosts = this.props.selectedPosts.filter(post =>
              post.rent >= min && post.rent <= max
          );
      }

      this.props.updateSelectedPosts(newPosts);

      this.setState({ min: min, max: max });



  }
  onChangeStartDate(date)
  {
      let newPosts  = [];
      if (this.props.selectedPosts.length === 0)
      {
          newPosts = this.props.posts.filter(post =>
              new Date(date).getTime() <= (new Date(post.startDate).getTime() + 12096e5));
      }
      else {
          newPosts = this.props.selectedPosts.filter(post =>
              new Date(date).getTime() <= (new Date(post.startDate).getTime() + 12096e5)   &&  post.rent >= this.state.min &&  post.rent <= this.state.max);
      }

      this.props.updateSelectedPosts(newPosts);
      this.setState({ startDate: date});

  }
    onChangeEndDate(date)
    {
        let newPosts = [];
        if (this.props.selectedPosts.length === 0)
        {
            newPosts = this.props.posts.filter(post =>
                (new Date(this.state.endDate).getTime() + 12096e5) >= new Date(date).getTime()  &&  post.rent >= this.state.min &&  post.rent <= this.state.max
            );
        }
        else {
            newPosts =  this.props.selectedPosts.filter(post =>
                (new Date(this.state.endDate).getTime() + 12096e5) >= new Date(date).getTime()
            );
        }

        console.log(this.props.posts);
        console.log(date);

        this.props.updateSelectedPosts(newPosts);
        this.setState({ endDate: date});


    }
  onChangeStartYear(num)
  {
        this.setState({ startYear: this.state.startYear+num});
  }
    onChangeEndYear(num)
    {
        this.setState({ endYear: this.state.endYear+num});
    }
  render() {
  	
     console.log(this.props.selectedPosts);
    let feedContent = this.props.selectedPosts.map(post => <PostItem className="col-md-6" key={post._id} post={post} />);

    return (
    	<div className="col-md-12">
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
                        <button className="filterButtonSelected" onClick={() => this.setState({showPriceTool: true,showFilter: false,showCalendar: false})}>
                            <span style={{padding: 2, paddingTop: 6, paddingBottom: 6}}>  Price </span>
                        </button>

                    </div>
                }

                {this.state.showCalendar ?   <div>  <button className="filterButton" onClick={() => this.setState({showCalendar: false})}>
                        <span style={{padding: 2,paddingTop: 6, paddingBottom: 6}}> Dates </span>
                    </button>
                        <div className="filterPopUp">
                            <DatePicker
                                selected={this.state.startDate}
                                selectsStart
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.onChangeStartDate}
                            />

                            <DatePicker
                                selected={this.state.endDate}
                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.onChangeEndDate}
                            />
                        </div>
                    </div>:
                    <button className="filterButtonSelected"  onClick={() => this.setState({showCalendar: true,showPriceTool: false,showFilter: false})}>
                        <span style={{padding: 2,paddingTop: 6, paddingBottom: 6}}> Dates </span>
                    </button>}
                {this.state.showFilter ?   <div>  <button className="filterButton" onClick={() => this.setState({showFilter: false})}>
                        <span style={{padding: 2,paddingTop: 6, paddingBottom: 6}}> More </span>
                    </button>
                    </div>:
                    <button className="filterButtonSelected"  onClick={() => this.setState({showFilter: true,showPriceTool: false,showCalendar: false,showEndDate: false})}>
                        <span style={{padding: 2,paddingTop: 6, paddingBottom: 6}}> More </span>
                    </button>}


            </div>
    		<div className="row">
                {this.state.showFilter && <Filter priceChange={this.onPriceChange}/> }

                {  !this.state.showFilter && feedContent }
            </div>
    	</div>
    );
  }
}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired,
    selectedPosts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    selectedPosts: state.post.selectedPosts,
});

export default connect(mapStateToProps, { updateSelectedPosts })(PostFeed);

