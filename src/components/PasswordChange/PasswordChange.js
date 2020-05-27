import React, { Component } from "react";

import { withFirebase } from "../Firebase/index.js";

import "./PasswordChange.css";

const INITIAL_STATE = {
   passwordOne: "",
   passwordTwo: "",
   error: null,
};

class PasswordChangeForm extends Component {
   constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   handleSubmit(event) {
      const { passwordOne } = this.state;

      this.props.firebase
         .doPasswordUpdate(passwordOne)
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
      const { passwordOne, passwordTwo, error } = this.state;

      const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

      return (
         <div id="pw-change-form-container">
            <form id="pw-change-form" onSubmit={this.handleSubmit}>
               <input
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.handleChange}
                  type="password"
                  placeholder="New Password"
               />
               <input
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Confirm New Password"
               />
               <button disabled={isInvalid} type="submit">
                  Reset My Password
               </button>

               {error && <p>{error.message}</p>}
            </form>
         </div>
      );
   }
}

export default withFirebase(PasswordChangeForm);
