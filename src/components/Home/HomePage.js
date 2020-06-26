import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";

import PostContainer from "./PostContainer.js";
import PostForm from "./PostForm.js";

import { withFirebase } from "../Firebase/index.js";
import { mainTopics } from "./topics.js";

import "./styles/HomePage.css";

const INITIAL_STATE = {
   editing: false,
   updated: false,
   mainTopics,
   description: "",
};

class HomePage extends Component {
   constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE, myPosts: [] };

      this.getAudioLink = this.getAudioLink.bind(this);
      this.getProfilePicture = this.getProfilePicture.bind(this);
      this.getDescription = this.getDescription.bind(this);
      this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleDatabaseUpdate = this.handleDatabaseUpdate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.editPost = this.editPost.bind(this);
      this.deletePost = this.deletePost.bind(this);
      this.updateFromDatabase = this.updateFromDatabase.bind(this);
   }

   componentWillMount() {
      this.updateFromDatabase();
      this.getDescription();
      this.getAudioLink();
      this.getProfilePicture();
   }

   componentWillUpdate(nextProps, nextState) {
      if (!nextState.updated) {
         this.updateFromDatabase();
      }
   }

   componentWillUnmount() {
      const userUID = this.props.firebase.auth.currentUser.uid;
      this.props.firebase.userPosts(userUID).off();
      mainTopics.forEach(topic => this.props.firebase.topic(topic).off());
   }

   getDescription() {
      const userUID = this.props.firebase.auth.currentUser.uid;

      this.props.firebase
         .user(userUID)
         .child("description")
         .on("value", snapshot => {
            const description = snapshot.val();

            this.setState({ description });
         });
   }

   getProfilePicture() {
      const userUID = this.props.firebase.auth.currentUser.uid;

      this.props.firebase
         .user(userUID)
         .child("profileImageUrl")
         .on("value", snapshot => {
            const imageLink = snapshot.val();

            this.setState({ profilePicture: imageLink });
         });
   }

   getAudioLink() {
      const userUID = this.props.firebase.auth.currentUser.uid;
      let audioName = "";

      this.props.firebase
         .user(userUID)
         .child("audioName")
         .on("value", snapshot => {
            audioName = snapshot.val();
         });

      this.props.firebase.storage
         .ref("audios")
         .child(audioName)
         .getDownloadURL()
         .then(url => {
            if (url) {
               this.setState({
                  audioLink: url,
               });
            }
         });
   }

   updateFromDatabase() {
      const userUID = this.props.firebase.auth.currentUser.uid;

      this.props.firebase.userPosts(userUID).on("value", snapshot => {
         const postsObject = snapshot.val();

         if (postsObject) {
            const postsList = Object.keys(postsObject).map(key => {
               return {
                  ...postsObject[key],
                  id: key,
               };
            });

            this.setState({ myPosts: postsList });
         }

         this.setState({ updated: true });
      });
   }

   handleUploadSuccess(filename) {
      const UID = this.props.firebase.auth.currentUser.uid;
      console.log(filename);

      this.props.firebase.storage
         .ref("audios")
         .child(filename)
         .getDownloadURL()
         .then(url => {
            if (url) {
               this.props.firebase.user(UID).child("audioName").set(filename);

               this.setState({
                  audioLink: url,
               });
            }
         });
   }

   handleClick() {
      this.setState({ editing: this.state.editing ? false : true });
   }

   handleDatabaseUpdate(isDatabaseUpdated) {
      this.props.databaseUpdate(isDatabaseUpdated);
   }

   handleSubmit(event, postInformation) {
      const { title, date, topic, article, url, audioLink } = postInformation;

      const newPublication = {
         title,
         date,
         topic,
         article,
         url,
         audioLink,
      };

      const { email, uid } = this.props.firebase.auth.currentUser;

      this.props.firebase.userPosts(uid).push(newPublication);
      let postKey;

      this.props.firebase
         .userPosts(uid)
         .limitToLast(1)
         .on("child_added", snapshot => {
            postKey = snapshot.key;
         });

      const keyEmail = email.substring(0, email.indexOf("@"));

      this.props.firebase.setByTopic(topic, `${date}${keyEmail}${postKey}`, {
         email,
         ...newPublication,
      });

      this.setState({ editing: false });

      this.handleDatabaseUpdate(false);
      event.preventDefault();
   }

   editPost(event, postInformation) {
      const {
         postId,
         title,
         date,
         topic,
         article,
         url,
         audioLink,
      } = postInformation;

      const changes = {
         title,
         date,
         topic,
         article,
         url,
         audioLink,
      };

      const { email, uid } = this.props.firebase.auth.currentUser;

      this.props.firebase.userPosts(uid).child(postId).set(changes);
      const keyEmail = email.substring(0, email.indexOf("@"));
      this.props.firebase.setByTopic(topic, `${date}${keyEmail}${postId}`, {
         email,
         ...changes,
      });

      this.setState({ updated: false });

      this.handleDatabaseUpdate(false);
      event.preventDefault();
   }

   deletePost(event, postInfo) {
      const { email, uid } = this.props.firebase.auth.currentUser;

      this.props.firebase.userPosts(uid).child(postInfo.postId).remove();
      const keyEmail = email.substring(0, email.indexOf("@"));
      this.props.firebase
         .topic(postInfo.topic)
         .child(`${postInfo.date}${keyEmail}${postInfo.postId}`)
         .remove();

      this.setState({ updated: false });

      this.handleDatabaseUpdate(false);
      event.preventDefault();
   }

   render() {
      const postsToSend = this.state.myPosts;

      return (
         <div id="home-main">
            <div id="home-header">
               <h1>Share your work with other users</h1>
            </div>
            <div id="user-presentation">
               <p id="user-description">{this.state.description}</p>
               {this.state.profilePicture && (
                  <figure>
                     <img id="prof-img" src={this.state.profilePicture} />
                  </figure>
               )}
               <div id="recording-section">
                  {this.state.audioLink && (
                     <audio
                        id="user-recording"
                        src={this.state.audioLink}
                        controls
                     ></audio>
                  )}

                  <FileUploader
                     id="file-uploader"
                     accept="audio/*"
                     name="audio"
                     storageRef={this.props.firebase.storage.ref("audios")}
                     onUploadSuccess={this.handleUploadSuccess}
                  />
               </div>
            </div>
            {this.state.editing ? (
               <div id="home-post-section">
                  <PostForm
                     onSubmit={this.handleSubmit}
                     onDelete={this.deletePost}
                  />
                  <button
                     className="user-cancel-form"
                     onClick={this.handleClick}
                  >
                     Cancel
                  </button>
               </div>
            ) : (
               <div id="home-post-section">
                  <button id="button-new-post" onClick={this.handleClick}>
                     Create a new post
                  </button>
                  {postsToSend.length > 0 ? (
                     <PostContainer
                        posts={postsToSend}
                        onEdit={this.editPost}
                        onDelete={this.deletePost}
                     />
                  ) : (
                     <p style={{ fontSize: "1em" }}>
                        There are no posts from you
                     </p>
                  )}
               </div>
            )}
         </div>
      );
   }
}

export default withFirebase(HomePage);
