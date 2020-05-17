import React, { Component } from "react";
import { withFirebase } from "../Firebase/index.js";

import "./SignOutButton.css";

class SignOutButton extends Component {
   constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(event) {
      this.props.firebase.doSignOut();
      this.props.handleLogOut(false);
   }

   render() {
      return (
         <button
            className="sign-out-btn"
            type="button"
            onClick={this.handleClick}
         >
            Sign Out
         </button>
      );
   }
}

export default withFirebase(SignOutButton);
