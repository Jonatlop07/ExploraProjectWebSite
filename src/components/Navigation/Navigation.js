import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes.js";

export default class Navigation extends Component {
   render() {
      return (
         <div>
            <ul>
               <li>
                  <Link to={ROUTES.SIGN_IN}>Sign In</Link>
               </li>
               <li>
                  <Link to={ROUTES.PUBLICATIONS}>Publications</Link>
               </li>
               <li>
                  <Link to={ROUTES.HOME}>Home</Link>
               </li>
               <li>
                  <Link to={ROUTES.ACCOUNT}>My Account</Link>
               </li>
               <li>
                  <Link to={ROUTES.ADMIN}>Administrator</Link>
               </li>
            </ul>
         </div>
      );
   }
}
