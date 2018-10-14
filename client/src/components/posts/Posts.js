import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import Map from "../map/Map";

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
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div style={{overflow: 'scroll', height: '100vh'}} className="col-md-7">
              <PostForm />
              {postContent}
            </div>
              <div style={{overflow: 'hidden', height: '100vh',width: '100vh'}} className="col-md-5">
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
