import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation/Navigation.js";
import PublicationsPage from "../Publications/PublicationsPage.js";
import SignUpPage from "../SignUp/SignUp.js";
import SignInPage from "../SignIn/SignIn.js";
import PasswordForgetPage from "../PasswordForget/PasswordForgetPage.js";
import HomePage from "../Home/HomePage.js";
import AccountPage from "../Account/AccountPage.js";
import AdminPage from "../Admin/AdminPage.js";

import * as ROUTES from "../../constants/routes.js";
import { withFirebase } from "../Firebase/index.js";

import "./App.css";

class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         authUser: null,
      };
   }

   componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
         authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
      });
   }

   componentWillUnmount() {
      this.listener();
   }

   render() {
      return (
         <Router>
            <Navigation authUser={this.state.authUser} />
            <hr />
            <Route exact path={ROUTES.EXPLORE} component={PublicationsPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
               path={ROUTES.PASSWORD_FORGET}
               component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
         </Router>
      );
   }
}

export default withFirebase(App);
