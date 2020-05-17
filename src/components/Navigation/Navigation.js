import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes.js";

import "./Navigation.css";
import SignOutButton from "../SignOut/SignOutButton.js";

class Navigation extends Component {
   constructor(props) {
      super(props);
      this.doLogOut = this.doLogOut.bind(this);
   }

   doLogOut(isLoggedOut) {
      this.props.handleLogOut(isLoggedOut);
   }

   render() {
      if (!this.props.auth) {
         return <NavigationNonAuth />;
      }

      return (
         <NavigationAuth
            admin={this.props.admin}
            handleLogOut={this.doLogOut}
         />
      );
   }
}

const NavigationAuth = props => (
   <nav>
      <ul>
         <li>
            <Link className="nav-option" to={ROUTES.EXPLORE}>
               EXPLORE
            </Link>
         </li>
         <li>
            <Link className="nav-option" to={ROUTES.HOME}>
               HOME
            </Link>
         </li>
         <li>
            <Link className="nav-option" to={ROUTES.ACCOUNT}>
               ACCOUNT
            </Link>
         </li>
         {props.admin ? (
            <li>
               <Link className="nav-option" to={ROUTES.ADMIN}>
                  ADMIN
               </Link>
            </li>
         ) : (
            <li className="user-type">Normal User</li>
         )}
         <SignOutButton handleLogOut={props.handleLogOut} />
      </ul>
   </nav>
);

const NavigationNonAuth = () => (
   <nav>
      <ul>
         <li>
            <Link className="nav-option" to={ROUTES.EXPLORE}>
               EXPLORE
            </Link>
         </li>
         <li>
            <Link className="nav-option" to={ROUTES.SIGN_IN}>
               SIGN IN
            </Link>
         </li>
      </ul>
   </nav>
);

export default Navigation;
