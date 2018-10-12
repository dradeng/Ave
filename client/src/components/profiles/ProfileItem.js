import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import connect from "react-redux/es/connect/connect";
import { addFavorite, removeFavorite } from "../../actions/profileActions";
import '../../index.css';

class ProfileItem extends Component {


    constructor() {
        super();
        this.state = {
            showOpposite: false,
        };
    }
    onFavoriteClick(id) {
     this.props.addFavorite(id);
     this.setState({showOpposite: !this.state.showOpposite});
    }
    unfavoriteClick(id) {
        this.props.removeFavorite(id);
        this.setState({showOpposite: !this.state.showOpposite});

    }

    render() {
    const { profile, isFavorited } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{' '}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <div className="row">
            <h4>Skill Set</h4>
                {!this.state.showOpposite && !isFavorited &&
                <button
                    onClick={this.onFavoriteClick.bind(this, profile.user._id)}
                    type="button"
                    className="btn btn-light mr-1"
                >
                    <i className="text-secondary fas fa-star"/>
                </button>
                }
                {this.state.showOpposite && !isFavorited &&
                <button
                    onClick={this.unfavoriteClick.bind(this, profile.user._id)}
                    type="button"
                    className="btn btn-dark mr-1"
                >
                    <i className="text-secondary fas fa-star iconLight"/>
                </button>
                }
                {!this.state.showOpposite && isFavorited &&
                <button
                    onClick={this.unfavoriteClick.bind(this, profile.user._id)}
                    type="button"
                    className="btn btn-dark mr-1"
                >
                    <i className="text-secondary fas fa-star iconLight"/>
                </button>
                }
                {this.state.showOpposite && isFavorited &&
                <button
                    onClick={this.onFavoriteClick.bind(this, profile.user._id)}
                    type="button"
                    className="btn btn-light mr-1"
                >
                    <i className="text-secondary fas fa-star"/>
                </button>
                }

            </div>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  isFavorited: PropTypes.bool.isRequired

};

const mapStateToProps = state => ({
    auth: state.auth
});

export default  connect(mapStateToProps, { addFavorite, removeFavorite })(ProfileItem);
