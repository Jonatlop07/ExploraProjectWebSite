import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes.js";

class Navigation extends Component {
   render() {
      if (!this.props.auth) {
         return <NavigationNonAuth />;
      }

      return <NavigationAuth />;
   }
}

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
         <Link to={ROUTES.ADMIN}>Admin</Link>
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
