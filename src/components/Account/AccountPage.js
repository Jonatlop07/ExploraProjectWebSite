import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";

import { PasswordForgetForm } from "../PasswordForget/PasswordForget.js";
import PasswordChangeForm from "../PasswordChange/PasswordChange.js";
import { withFirebase } from "../Firebase/index.js";

import "./AccountPage.css";

class AccountPage extends Component {
   constructor(props) {
      super(props);

      this.state = { description: "", profileImageUrl: "" };
      this.handleChange = this.handleChange.bind(this);
      this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
      this.changeDescripcion = this.changeDescripcion.bind(this);
   }

   handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
   }

   handleUploadSuccess(filename) {
      const UID = this.props.firebase.auth.currentUser.uid;

      this.props.firebase.storage
         .ref("images")
         .child(filename)
         .getDownloadURL()
         .then(url => {
            if (url) {
               this.setState({
                  profileImageUrl: url,
               });

               this.props.firebase.user(UID).child("profileImageUrl").set(url);
            }
         });
   }

   changeDescripcion(event) {
      const UID = this.props.firebase.auth.currentUser.uid;

      this.props.firebase
         .user(UID)
         .child("description")
         .set(this.state.description);

      event.preventDefault();
   }

   render() {
      return (
         <div id="account-main">
            <p id="account-title">Account: {this.props.firebase.auth.email}</p>
            <div id="about-div">
               <hr />
               <p id="description">About you:</p>
               <form id="form-description">
                  <input
                     id="inpt-description"
                     name="description"
                     value={this.state.description}
                     onChange={this.handleChange}
                     type="text"
                     placeholder="Enter your description here"
                  />
                  <button
                     id="btn-save-description"
                     type="submit"
                     onClick={this.changeDescripcion}
                  >
                     Save
                  </button>
               </form>
               <hr />
               <p>Profile Photo:</p>
               <FileUploader
                  id="form-file-uploader"
                  accept="image/*"
                  name="image"
                  storageRef={this.props.firebase.storage.ref("images")}
                  onUploadSuccess={this.handleUploadSuccess}
               />
               <hr />
            </div>
            <p className="question-p">
               Do you want to change your password? You can change it:
            </p>
            <PasswordForgetForm />
            <hr />
            <p className="question-p">
               Did you forgot your password? You can create a new one:
            </p>
            <PasswordChangeForm />
         </div>
      );
   }
}

export default withFirebase(AccountPage);
