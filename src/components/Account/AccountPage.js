import React from "react";

import { PasswordForgetForm } from "../PasswordForget/PasswordForget.js";
import PasswordChangeForm from "../PasswordChange/PasswordChange.js";

const AccountPage = () => (
   <div>
      <h1>Do you want to change your password? You can change it:</h1>
      <PasswordForgetForm />
      <h1>Did you forgot your password? You can create a new one:</h1>
      <PasswordChangeForm />
   </div>
);

export default AccountPage;
