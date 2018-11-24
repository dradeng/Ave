import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapContainer from "../map/MapContainer";


class PostInfoBox extends Component {



    render() {
        const { post } = this.props;

        var geojson = [];
        geojson['type'] = 'FeatureCollection';
        geojson['features'] = [];
        geojson.push(post);

        return (
            <div className="card card-body mb-3 feedTile">
                <h1>
                    {post.title}
                </h1>
                <h3>
                    {post.text}
                </h3>
                <h5>
                    {post.address}
                </h5>
                <div style={{height: 250, width: 300, marginTop: '10%'}} className="col-md-8">
                    <MapContainer id="map" geojson={geojson}/>
                </div>

            </div>

        );
    }
}



PostInfoBox.propTypes = {
    post: PropTypes.object.isRequired,
};


export default PostInfoBox;
