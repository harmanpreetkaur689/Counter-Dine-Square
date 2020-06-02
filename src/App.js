import React,{Component} from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { withFirebase } from "./components/Firebase";

import Navbar from "./components/navbar";
import Login from "./components/Login";
import logo from './logo.svg';
import './App.css';
import AddItems from './components/AddItems';
import AddBalance from './components/AddBalance'
class App extends Component{
  state = {
    userData: null,
    uid: null,
    username: null,
    users: {}
  };
  fetchUserData = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser != this.state.userData)
        authUser
          ? this.setState({ userData: authUser })
          : this.setState({ userData: null });
    });
  };
  fetchUserName = () => {
    if (this.state.userData != null) {
      this.props.firebase.db
        .ref("users/" + this.state.userData.uid)
        .once("value")
        .then((snapshot) => {
          const user =
            (snapshot.val() && snapshot.val().username) || "Anonymous";
          if (this.state.username != user) {
            this.setState({ username: user });
          }
        });
    }
  };
  componentDidUpdate() {
    //console.log(this.state.userData.email);

    this.fetchUserName();
    //console.log(this.props.firebase.auth.username);
  }
  componentDidMount() {
    this.fetchUserData();
  }
  render() {
    return (
      <Router basename="/">
        <div>
          <Navbar user={this.state.userData} username={this.state.username} />
          <Switch>
            
            
            <Route path="/Login">
              <Login />
            </Route>
            
            <Route path="/AddItems">
              <AddItems />
            </Route>
            <Route path="/AddBalance">
              <AddBalance />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
} 

export default withFirebase(App);
