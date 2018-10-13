import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Geocode from 'react-geocode';
import axios from 'axios';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      address: '',
      longitude: 0,
      latitude: 0,
      images: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      title: this.state.title,
      text: this.state.text,
      address: this.state.address,
      longitude: this.state.longitude, 
      latitude: this.state.latitude, 
      name: user.name,
      avatar: user.avatar,
      images: this.state.images
    };

    this.props.addPost(newPost);
    this.setState({ text: '' });
    this.setState({ title: '' });
    this.setState({ address: '' });
    this.setState({ images: '' });
    this.setState({ latitude: 0 });
    this.setState({ longitude: 0 });
    
    
  }
  //THIS IS FOR A FILE BE UPLOADED
  fileChangedHandler = (event) => {
    
    const file = event.target.files[0];
    
    // this.setState({selectedFile: event.target.files[0]});
    const uuidv4 = require('uuid/v4');
    const formData = new FormData();
    var fileName = uuidv4();

    formData.append('file', file, fileName);

    // I do this after so it only affects the state, not whats uploaded to s3
    // The state & model in the db stores the whole url
    fileName = 'https://s3.us-east-2.amazonaws.com/aveneu/' + fileName;
    this.setState({ images: fileName });
    
    axios.post('api/posts/uploads', formData);


  }

  onChange(e) {

    this.setState({ [e.target.name]: e.target.value });
 
    if( e.target.name === 'address')
    {
      this.getLatLong(e.target.value);
    }
  }
  getLatLong(address) {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    
    const GoogleMapsApi = require('../../config/index').GoogleMapsApi;
    Geocode.setApiKey(GoogleMapsApi);
     
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
     
    // Get latidude & longitude from address.
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        
        this.setState({ latitude: lat});
        this.setState({ longitude: lng});
      },
      error => {
        //console.error(error);
        //Commented out because it says an error when ur not done typing out address
      }
    );
  
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit} method="POST" enctype="multipart/form-data">
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Title of post"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title} 
                />
              </div>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Address of post (this will not be publicly visible)"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                />
              </div>
              
              
              <input type="file" name="file" id="file" onChange={this.fileChangedHandler}/>

              <button type="submit" className="btn btn-dark">
                Submit
              </button>
         
            </form>
            

          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
