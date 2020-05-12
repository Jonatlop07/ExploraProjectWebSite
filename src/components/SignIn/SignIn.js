import React, { Component } from "react";

import { SignUpLink } from "../SignUp/SignUp.js";
import { PasswordForgetLink } from "../PasswordForget/PasswordForget.js";

import { withFirebase } from "../Firebase/index.js";

const INITIAL_STATE = {
   email: "",
   password: "",
   error: null,
};

class SignInPage extends Component {
   constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
   }

   handleLogin(isLoggedIn) {
      this.props.handleAuth(isLoggedIn);
   }

   handleSubmit(event) {
      const { email, password } = this.state;

      this.props.firebase
         .doSignInWithEmailAndPassword(email, password)
         .then(() => {
            this.handleLogin(true);
         })
         .catch(error => {
            this.handleLogin(false);
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
         <div>
            <h1>Sign In</h1>
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
            <PasswordForgetLink />
            <SignUpLink />
         </div>
      );
   }
}

export default withFirebase(SignInPage);
