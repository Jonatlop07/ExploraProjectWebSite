import React, { Component } from "react";

import { PasswordForgetForm } from "../PasswordForget/PasswordForget.js";
import PasswordChangeForm from "../PasswordChange/PasswordChange.js";
import { withFirebase } from "../Firebase/index.js";

import "./AccountPage.css";

class AccountPage extends Component {
   render() {
      return (
         <div className="account-main">
            <h1>Account: {this.props.firebase.auth.email}</h1>
            <h1>Do you want to change your password? You can change it:</h1>
            <PasswordForgetForm />
            <h1>Did you forgot your password? You can create a new one:</h1>
            <PasswordChangeForm />
         </div>
      );
   }
}

export default withFirebase(AccountPage);
