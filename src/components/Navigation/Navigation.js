import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes.js";

class Navigation extends Component {
   render() {
      if (!this.props.auth) {
         return <NavigationNonAuth />;
      }

      return <NavigationAuth admin={this.props.admin} />;
   }
}

const NavigationAuth = props => (
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
      {props.admin ? (
         <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
         </li>
      ) : (
         <li>Normal User</li>
      )}
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
