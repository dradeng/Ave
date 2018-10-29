import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import Map from "../map/Map";
import Month from '../availability/Month';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

      var geojson = [];
      geojson['type'] = 'FeatureCollection';
      geojson['features'] = [];

      for (var k in posts) {
          if (!posts[k].latitude)
          {
            continue;
          }
          /*
          var newFeature = {
              "type": "Feature",
              "geometry": {
                  "type": "Point",
                  "coordinates": [parseFloat(posts[k].latitude), parseFloat(posts[k].longitude)]
               },
          "properties": {
              "title": posts[k].title,
                  "description": posts[k].text
          }
      }

          geojson['features'].push(newFeature);
*/
          geojson.push(posts[k]);
      }


    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed  posts={posts} />;
    }

    return (
      <div style={{margin: 5, marginTop: -5}}  className="feed">
        <div >
            <div  style={{overflow: 'scroll',background: '#FFFFFF',position: 'absolute',zIndex: 100, maxWidth: 840, height: '100vh'}} className="col-md-8 row">
                <PostForm className="col-lg-12 col-md-8" />
                {postContent}

            </div>
          <div className="row">
            <div className="col-md-4">

            </div>
              <div id="map" style={{overflow: 'hidden', height: '100vh',width: '100vh', right: 5,top: 0}} className="col-md-8">
                  <Map geojson={geojson}/>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
