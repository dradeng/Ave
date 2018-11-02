import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, getProfileByID } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import PostItem from "../posts/PostItem";


class Favorites extends Component {

    constructor() {
        super();
        this.state = {
            profiles: [],
            loading: true,
        };


    }
    render() {

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Favorites</h1>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default Favorites;
