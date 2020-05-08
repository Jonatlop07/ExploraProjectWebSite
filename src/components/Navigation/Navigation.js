import React, { Component } from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut/SignOutButton.js";

import * as ROUTES from "../../constants/routes.js";
import { AuthUserContext } from "../Session/Session.js";

const Navigation = () => (
   <div>
      <AuthUserContext.Consumer>
         {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
   </div>
);

const NavigationAuth = () => (
   <ul>
      <li>
         <Link to={ROUTES.EXPLORE}>Explore</Link>
      </li>
      <li>
         <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
         <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
         <SignOutButton />
      </li>
   </ul>
);

const NavigationNonAuth = () => (
   <ul>
      <li>
         <Link to={ROUTES.EXPLORE}>Explore</Link>
      </li>
      <li>
         <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
   </ul>
);

export default Navigation;
