import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "./Firebase";
import Navigation from "./Navigation";
class Navbar extends Component {
  render() {
    return (
      <div class="d-flex bd-highlight bg-dark col-12"  >
        <div class="text-danger bd-highlight font-weight-bold navbar-brand pt-2">DINE-SQUARE</div>
        <div class="ml-auto p-1 bd-highlight"><Navigation user={this.props.user} username={this.props.username}></Navigation></div>
      </div>
    );
  }
}

export default withFirebase(Navbar);
