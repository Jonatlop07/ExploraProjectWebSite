import React, { Component } from "react";

import { PasswordForgetForm } from "../PasswordForget/PasswordForget.js";
import PasswordChangeForm from "../PasswordChange/PasswordChange.js";
import { withAuthorization, AuthUserContext } from "../Session/Session.js";

class AccountPage extends Component {
   render() {
      return (
         <AuthUserContext.Consumer>
            {authUser => (
               <div>
                  <h1>Account: {authUser.email}</h1>
                  <h1>
                     Do you want to change your password? You can change it:
                  </h1>
                  <PasswordForgetForm />
                  <h1>
                     Did you forgot your password? You can create a new one:
                  </h1>
                  <PasswordChangeForm />
               </div>
            )}
         </AuthUserContext.Consumer>
      );
   }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
