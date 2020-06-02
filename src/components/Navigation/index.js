import React, { Component } from 'react';
import Login from '../Login';
import NavAuth from './NavAuth';
import { Link } from 'react-router-dom';


class Navigation extends Component {
    render() {
        return (
            <div className="row justify-content-center justify-content-sm-end">
                {this.props.user ? <NavAuth authUser={this.props.user} username={this.props.username} /> :
                    <div className="btn-group">
                        <Link className="btn btn-dark" to="/Login">LOGIN</Link>
                        
                    </div>}
            </div>

        );
    }
}
export default Navigation;