import React, { Component } from "react";

import PostContainer from "./PostContainer.js";
import PostForm from "./PostForm.js";

import { withFirebase } from "../Firebase/index.js";
import { mainTopics } from "./topics.js";

import "./HomePage.css";

const INITIAL_STATE = {
   editing: false,
   title: "",
   date: "",
   topic: "",
   article: "",
   error: null,
   mainTopics,
};

class HomePage extends Component {
   constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE, myPosts: [] };

      this.handleClick = this.handleClick.bind(this);
      this.handleDatabaseUpdate = this.handleDatabaseUpdate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.editPost = this.editPost.bind(this);
      this.deletePost = this.deletePost.bind(this);
      this.updateFromDatabase = this.updateFromDatabase.bind(this);
   }

   componentWillMount() {
      this.updateFromDatabase();
   }

   componentWillUpdate(nextProps, nextState) {
      if (!this.state.editing && nextState.editing) {
         this.updateFromDatabase();
      }
   }

   componentWillUnmount() {
      const userUID = this.props.firebase.auth.currentUser.uid;
      this.props.firebase.userPosts(userUID).off();
      mainTopics.forEach(topic => this.props.firebase.topic(topic).off());
   }

   updateFromDatabase() {
      const userUID = this.props.firebase.auth.currentUser.uid;
      this.props.firebase.userPosts(userUID).on("value", snapshot => {
         const postsObject = snapshot.val();

         const postsList = Object.keys(postsObject).map(key => {
            return {
               ...postsObject[key],
               id: key,
            };
         });

         this.setState({ myPosts: postsList });
      });
   }

   handleClick() {
      this.setState({ editing: this.state.editing ? false : true });
   }

   handleDatabaseUpdate(isDatabaseUpdated) {
      this.props.databaseUpdate(isDatabaseUpdated);
   }

   handleSubmit(event, object) {
      const { title, date, topic, article } = this.state;

      const newPublication = {
         title,
         date,
         topic,
         article,
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

      this.props.firebase.setByTopic(topic, `${keyEmail}${postKey}`, {
         email,
         ...newPublication,
      });

      this.setState({ editing: false });

      this.handleDatabaseUpdate(false);
      event.preventDefault();
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
      });
   }

   editPost(event, postInformation) {
      const { postId, title, date, topic, article } = postInformation;

      const changes = {
         title,
         date,
         topic,
         article,
      };

      const { email, uid } = this.props.firebase.auth.currentUser;

      this.props.firebase.userPosts(uid).child(postId).set(changes);
      const keyEmail = email.substring(0, email.indexOf("@"));
      this.props.firebase.setByTopic(topic, `${keyEmail}${postId}`, {
         email,
         ...changes,
      });

      this.setState({ editing: false });

      this.handleDatabaseUpdate(false);
      event.preventDefault();
   }

   deletePost(event, postInfo) {
      const { email, uid } = this.props.firebase.auth.currentUser;

      this.props.firebase.userPosts(uid).child(postInfo.postId).remove();
      const keyEmail = email.substring(0, email.indexOf("@"));
      this.props.firebase
         .topic(postInfo.topic)
         .child(`${keyEmail}${postInfo.postId}`)
         .remove();

      this.setState({ editing: false });

      this.handleDatabaseUpdate(false);
      event.preventDefault();
   }

   render() {
      const postsToSend = this.state.myPosts;

      return (
         <div className="home-main">
            <div className="header-home">
               <h1>Share your work with other users</h1>
            </div>
            {this.state.editing ? (
               <div className="post-div-home">
                  <PostForm
                     onChange={this.handleChange}
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
               <div className="post-div-home">
                  <button
                     className="button-new-post"
                     onClick={this.handleClick}
                  >
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
                        There is no posts from you
                     </p>
                  )}
               </div>
            )}
         </div>
      );
   }
}

export default withFirebase(HomePage);
