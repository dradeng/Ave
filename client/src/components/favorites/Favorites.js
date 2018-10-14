import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, getProfileByID } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileItem from "../profiles/ProfileItem";


class Favorites extends Component {

    constructor() {
        super();
        this.state = {
            profiles: [],
            loading: true,
        };


    }
    componentWillMount() {
     this.props.getCurrentProfile();
    }
    componentDidMount() {
        let favoriteProfiles;

        if (!this.props.loading) {
            if (this.props.profile.profile.favoriteProfile.length > 0) {
                favoriteProfiles = this.props.profile.profile.favoriteProfile.map(profile => (
                    this.props.getProfileByID(profile.user)
                ));
            }
        }



        this.setState({profiles: favoriteProfiles});


    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading, favoriteProfile } = this.props.profile;
        console.log(favoriteProfile);
        let favoriteContent;
        if (favoriteProfile.length > 0) {
            favoriteContent = favoriteProfile.map(profile => (
                <ProfileItem isFavorited={true} key={profile._id} profile={profile} />
            ));
        }
        if (favoriteProfile === null || loading) {

                // User is logged in but has no profile
                favoriteContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>Once your favorite some users, they're pop up here!</p>
                        <Link to="/profiles" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>
                );
        }


        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Favorites</h1>
                            {favoriteContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Favorites.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getProfileByID: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, getProfileByID })(
    Favorites
);
