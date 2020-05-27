import React, { Component } from "react";

import { PasswordForgetForm } from "../PasswordForget/PasswordForget.js";
import PasswordChangeForm from "../PasswordChange/PasswordChange.js";
import { withFirebase } from "../Firebase/index.js";

import "./AccountPage.css";

class AccountPage extends Component {
   render() {
      return (
         <div id="account-main">
            <p id="account-title">Account: {this.props.firebase.auth.email}</p>
            <p className="question-p">
               Do you want to change your password? You can change it:
            </p>
            <PasswordForgetForm />
            <p className="question-p">
               Did you forgot your password? You can create a new one:
            </p>
            <PasswordChangeForm />
         </div>
      );
   }
}

export default withFirebase(AccountPage);
