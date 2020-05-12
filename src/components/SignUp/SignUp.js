import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase/index.js";
import * as ROUTES from "../../constants/routes.js";

const INITIAL_STATE = {
   username: "",
   email: "",
   passwordOne: "",
   passwordTwo: "",
   error: null,
};

class SignUpPage extends Component {
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
      const { username, email, passwordOne } = this.state;
      const publications = null;
      this.props.firebase
         .doCreateUserWithEmailAndPassword(email, passwordOne)
         .then(authUser => {
            return this.props.firebase.user(authUser.user.uid).set({
               username,
               email,
               publications,
            });
         })
         .then(() => {
            this.props.handleAuth(true);
         })
         .catch(error => {
            this.props.handleAuth(false);
         });

      event.preventDefault();
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
      });
   }

   render() {
      const { username, email, passwordOne, passwordTwo, error } = this.state;

      const isInvalid =
         passwordOne !== passwordTwo ||
         passwordOne === "" ||
         email === "" ||
         username === "";

      return (
         <form onSubmit={this.handleSubmit}>
            <input
               name="username"
               value={username}
               onChange={this.handleChange}
               type="text"
               placeholder="Username"
            />
            <input
               name="email"
               value={email}
               onChange={this.handleChange}
               type="text"
               placeholder="Email Address"
            />
            <input
               name="passwordOne"
               value={passwordOne}
               onChange={this.handleChange}
               type="password"
               placeholder="Password"
            />
            <input
               name="passwordTwo"
               value={passwordTwo}
               onChange={this.handleChange}
               type="password"
               placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">
               Sign Up
            </button>

            {error && <p>{error.message}</p>}
         </form>
      );
   }
}

const SignUpLink = () => (
   <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
   </p>
);

export default withFirebase(SignUpPage);

export { SignUpPage, SignUpLink };
