import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Firebase from "../Firebase";
import { Link } from 'react-router-dom';
import SignOut from '../SignOut';


class NavAuth extends Component {
    componentDidUpdate() {
        //console.log(this.props.firebase);
    }
    render() {
        let location = "/profile";
        return (
            <div>
                <Link
                    to="/vendorcart" className="btn btn-dark ">{this.props.username}
                </Link>
                <Link
                    to="/AddItems"
                 className="btn btn-dark ">Manage Items
                </Link>
                <SignOut />

            </div>
        );
    }
}
export default NavAuth;