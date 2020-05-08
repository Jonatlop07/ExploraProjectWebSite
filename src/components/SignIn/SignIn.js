import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp/SignUp.js";
import { PasswordForgetLink } from "../PasswordForget/PasswordForget.js";
import { withFirebase } from "../Firebase/index.js";
import * as ROUTES from "../../constants/routes.js";

const SignInPage = () => (
   <div>
      <h1>SignIn</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
   </div>
);

const INITIAL_STATE = {
   email: "",
   password: "",
   error: null,
};

class SignInFormBase extends Component {
   constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   handleSubmit(event) {
      const { email, password } = this.state;

      this.props.firebase
         .doSignInWithEmailAndPassword(email, password)
         .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
         })
         .catch(error => {
            this.setState({ error });
         });

      event.preventDefault();
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
      });
   }

   render() {
      const { email, password, error } = this.state;

      const isInvalid = password === "" || email === "";

      return (
         <form onSubmit={this.handleSubmit}>
            <input
               name="email"
               value={email}
               onChange={this.handleChange}
               type="text"
               placeholder="Email Address"
            />
            <input
               name="password"
               value={password}
               onChange={this.handleChange}
               type="password"
               placeholder="Password"
            />
            <button disabled={isInvalid} type="submit">
               Sign In
            </button>

            {error && <p>{error.message}</p>}
         </form>
      );
   }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
