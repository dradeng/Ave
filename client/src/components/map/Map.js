/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import Geocode from "react-geocode";
import PropTypes from 'prop-types';
import ControlPanel from './control-panel';
import CityPin from './city-pin';
import CityInfo from './city-info';

import CITIES from './cities.json';

const TOKEN = 'pk.eyJ1IjoiamV5b3VuZzciLCJhIjoiY2psOWtuaWx6MXBkbTNycWthMmxnOW0xMiJ9.M9PIOVFgxrcS_mVJ3mo7jw'; // Set your mapbox token here
Geocode.setApiKey("AIzaSyClJGJws9F_THRJmYGg8R78zDI4jtuxkoc");

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 37.785164,
                longitude: -100,
                zoom: 3.5,
                bearing: 0,
                pitch: 0,
                width: 500,
                height: 500,
            },
            popupInfo: null
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize);
        this._resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resize);
    }

    _resize = () => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: this.props.width || window.innerWidth,
                height: this.props.height || window.innerHeight
            }
        });
    };

    _updateViewport = (viewport) => {
        this.setState({viewport});
    }

    _renderPropertyMarker = (property, index) => {
        console.log(property);
        return (
            <Marker key={`marker-${property._id}`}
                    longitude={property.longitude}
                    latitude={property.latitude} >
                <CityPin size={20} onClick={() => this.setState({popupInfo: property})} />
            </Marker>
        );
    }

    _renderPopup() {
        const {popupInfo} = this.state;
        console.log(popupInfo);
        return popupInfo && (
            <Popup tipSize={5}
                   anchor="top"
                   longitude={popupInfo.longitude}
                   latitude={popupInfo.latitude}
                   onClose={() => this.setState({popupInfo: null})} >
                <CityInfo info={popupInfo} />
            </Popup>
        );
    }

    render() {

        const {viewport} = this.state;

        return (
            <MapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onViewportChange={this._updateViewport}
                mapboxApiAccessToken={TOKEN} >

                { this.props.geojson.map(this._renderPropertyMarker) }

                {this._renderPopup()}

                <div className="nav" style={navStyle}>
                    <NavigationControl onViewportChange={this._updateViewport} />
                </div>


            </MapGL>
        );
    }

}

Map.propTypes = {
    geojson: PropTypes.array.isRequired,
};