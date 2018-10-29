import React from 'react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Filter = props => {




    return (
        <div style={{marginLeft: 20,width: '100%',
        }}>

            <h3>
                Price
            </h3>
            <Range className="col-sm-10"  tipTransitionName='rc-slider-tooltip-zoom-down' onChange={(evt)=> props.priceChange(evt[0],evt[1])}  defaultValue={[0,5000]} max={5000}  min={0}/>
            <div>
                <h3> Type </h3>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary">Left</button>
                    <button type="button" className="btn btn-secondary">Middle</button>
                    <button type="button" className="btn btn-secondary">Right</button>
                </div>
            </div>
            <div>
                <h3> Duration </h3>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary">Left</button>
                    <button type="button" className="btn btn-secondary">Middle</button>
                    <button type="button" className="btn btn-secondary">Right</button>
                </div>
            </div>
            <div>
                <h3> Roommates </h3>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary">Left</button>
                    <button type="button" className="btn btn-secondary">Middle</button>
                    <button type="button" className="btn btn-secondary">Right</button>
                </div>
            </div>
            <div>
                <h3> Bedrooms </h3>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary">Left</button>
                    <button type="button" className="btn btn-secondary">Middle</button>
                    <button type="button" className="btn btn-secondary">Right</button>
                </div>
            </div>
            <button> Apply </button>
        </div>
    );
};

Filter.propTypes = {
    priceChange: PropTypes.func.isRequired,
};


export default Filter;