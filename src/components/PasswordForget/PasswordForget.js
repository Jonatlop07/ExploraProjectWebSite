import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import "./PasswordForget.css";

const PasswordForgetPage = () => (
   <div>
      <p>Password Forgot</p>
      <PasswordForgetForm />
   </div>
);

const INITIAL_STATE = {
   email: "",
   error: null,
};

class PasswordForgetFormBase extends Component {
   constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   handleSubmit(event) {
      const { email } = this.state;

      this.props.firebase
         .doPasswordReset(email)
         .then(() => {
            this.setState({ ...INITIAL_STATE });
         })
         .catch(error => {
            this.setState({ error });
         });

      event.preventDefault();
   }

   handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
   }

   render() {
      const { email, error } = this.state;

      const isInvalid = email === "";

      return (
         <form onSubmit={this.handleSubmit}>
            <input
               name="email"
               value={this.state.email}
               onChange={this.handleChange}
               type="text"
               placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit">
               Reset My Password
            </button>

            {error && <p>{error.message}</p>}
         </form>
      );
   }
}

const PasswordForgetLink = () => (
   <p className="link-password-text">
      <Link className="link-password" to={ROUTES.PASSWORD_FORGET}>
         Forgot Password?
      </Link>
   </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
