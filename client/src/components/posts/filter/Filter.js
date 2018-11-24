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


            <div className="filterBox">
                <h5> Type </h5>
                <div  style={{margin: 10}}  className="btn-group buttonFilter" role="group" aria-label="Basic example">
                    <button type="button" className="btn btncustom-light btn-secondary buttonFilter"> Private Room </button>
                    <button type="button" className="btn btncustom-light  btn-secondary buttonFilter"> Full Apartment </button>
                    <button type="button" className="btn btncustom-light btn-secondary buttonFilter">Shared Room</button>
                </div>
            </div>
            <div className="filterBox ">
                <h5> Flatmates </h5>
                <div style={{margin: 10}} className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btncustom-light btn-secondary buttonFilter"> One </button>
                    <button type="button" className="btn btncustom-light btn-secondary buttonFilter"> Two </button>
                    <button type="button" className="btn  btncustom-light btn-secondary buttonFilter"> Three </button>
                    <button type="button" className="btn  btncustom-light btn-secondary buttonFilter"> Four </button>
                </div>
            </div>
            <div className="filterBox">
                <h5> Bathroom </h5>
                <div  style={{margin: 10}}  className="btn-group buttonFilter" role="group" aria-label="Basic example">
                    <button type="button" className="btn btncustom-light btn-secondary buttonFilter">Private </button>
                    <button type="button" className="btn btncustom-light btn-secondary buttonFilter">Shared </button>
                </div>
            </div>
        </div>
    );
};

Filter.propTypes = {
    priceChange: PropTypes.func.isRequired,
};


export default Filter;