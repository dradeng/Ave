import React from 'react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const MonthGrid = props => {




    return (
        <div>
           <span style={{textAlign: 'center',marginBottom: 5, fontSize: 16}}> 2018</span>
        <div className="row">
            <div >
                <div className="monthBox" >
                Jan
                </div>
                <div className="monthBox" >
                May
                </div>
                <div className="monthBox" >
                Sep
                </div>
            </div>
            <div >
                <div className="monthBox" >
                Feb
                </div>
                <div className="monthBox" >
                Jun
                </div>
                <div className="monthBox" >
                Oct
                </div>
            </div>
            <div >
                <div className="monthBox" >
                Mar
                </div>
                <div className="monthBox" >
                Jul
                </div>
                <div className="monthBox" >
                Nov
                </div>
            </div>
            <div >
                <div className="monthBox" >
                Apr
                </div>
                <div className="monthBox" >
                Aug
                </div>
                <div className="monthBox" >
                Dec
                </div>
            </div>
        </div>
        </div>
    );
};



export default MonthGrid;