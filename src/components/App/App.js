import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation/Navigation.js";
import PublicationsPage from "../Explore/ExplorePage.js";
import SignUpPage from "../SignUp/SignUp.js";
import SignInPage from "../SignIn/SignIn.js";
import PasswordForgetPage from "../PasswordForget/PasswordForgetPage.js";
import HomePage from "../Home/HomePage.js";
import AccountPage from "../Account/AccountPage.js";
import AdminPage from "../Admin/AdminPage.js";

import * as ROUTES from "../../constants/routes.js";
import { withAuthentication } from "../Session/Session.js";

import "./App.css";

function App() {
   <Router>
      <div>
         <Navigation />
         <hr />
         <Route exact path={ROUTES.EXPLORE} component={ExplorePage} />
         <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
         <Route path={ROUTES.SIGN_IN} component={SignInPage} />
         <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
         <Route path={ROUTES.HOME} component={HomePage} />
         <Route path={ROUTES.ACCOUNT} component={AccountPage} />
         <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
   </Router>;
}

export default withAuthentication(App);
