import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation/Navigation.js";
import PublicationsPage from "../Publications/PublicationsPage.js";
import SignUpPage from "../SignUp/SignUpPage.js";
import SignInPage from "../SignIn/SignInPage.js";
import PasswordForgetPage from "../PasswordForget/PasswordForgetPage.js";
import HomePage from "../Home/HomePage.js";
import AccountPage from "../Account/AccountPage.js";
import AdminPage from "../Admin/AdminPage.js";

import * as ROUTES from "../../constants/routes.js";

import "./App.css";

function App() {
   const [] = React.useState(false);
   return (
      <Router>
         <Navigation />
         <hr />
         <Route exact path={ROUTES.PUBLICATIONS} component={PublicationsPage} />
         <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
         <Route path={ROUTES.SIGN_IN} component={SignInPage} />
         <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
         <Route path={ROUTES.HOME} component={HomePage} />
         <Route path={ROUTES.ACCOUNT} component={AccountPage} />
         <Route path={ROUTES.ADMIN} component={AdminPage} />
      </Router>
   );
}

export default App;
