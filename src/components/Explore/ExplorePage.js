import React, { Component } from "react";

import PostContainer from "./PostContainer.js";
import Post from "./Post.js";
import User from "./User.js";

import { withFirebase } from "../Firebase/index.js";

import "./styles/ExplorePage.css";

class ExplorePage extends Component {
   constructor(props) {
      super(props);

      this.state = {
         updated: this.props.isUpdated,
         showingProfile: false,
         postContainers: [],
         users: [],
         currentProfile: {},
         userPosts: [],
      };

      this.updateFromDatabase = this.updateFromDatabase.bind(this);
      this.handleUserSelection = this.handleUserSelection.bind(this);
   }

   updateFromDatabase() {
      this.props.firebase.posts().on("value", snapshot => {
         const postTopicsObject = snapshot.val();

         const postTopicsList = Object.keys(postTopicsObject).map(key => ({
            ...postTopicsObject[key],
            id: key,
         }));

         this.setState({
            postContainers: postTopicsList,
         });
      });

      this.props.firebase.users().on("value", snapshot => {
         const usersObject = snapshot.val();

         const usersList = Object.keys(usersObject).map(uid => ({
            ...usersObject[uid],
            uid,
         }));

         this.setState({
            users: usersList,
         });
      });

      this.setState({ updated: true });
   }

   componentWillMount() {
      if (!this.state.updated) {
         this.updateFromDatabase();
      }
   }

   componentWillUnmount() {
      this.props.firebase.posts().off();
   }

   handleUserSelection(userInfo) {
      if (userInfo.publications) {
         const userPublications = userInfo.publications["1"];
         const userPostsList = Object.keys(userPublications)
            .map(id => ({
               ...userPublications[id],
               id,
            }))
            .reverse();

         this.setState({ userPosts: userPostsList });
      }

      const { email, username } = userInfo;

      this.setState({
         currentProfile: {
            email,
            username,
         },
      });

      this.setState({ showingProfile: true });
   }

   render() {
      const email = this.state.currentProfile.email;
      return (
         <div>
            {!this.state.showingProfile ? (
               <div id="explore-public-posts-main">
                  <div id="explore-public-posts">
                     <div id="explore-header">
                        <h1>Welcome to Explora Projects Website</h1>
                     </div>
                     {
                        <div id="explore-section">
                           <div id="post-section">
                              {this.state.postContainers.length > 0 &&
                                 this.state.postContainers.map((posts, key) => (
                                    <PostContainer key={key} posts={posts} />
                                 ))}
                           </div>
                           <div id="user-posts-section">
                              <div id="user-posts-section-title"> Users</div>
                              <hr />
                              {this.state.users.length > 0 &&
                                 this.state.users.map((user, key) => (
                                    <User
                                       key={key}
                                       userInfo={user}
                                       onSelect={this.handleUserSelection}
                                    />
                                 ))}
                           </div>
                        </div>
                     }
                  </div>
               </div>
            ) : (
               <div className="explore-user-posts-section">
                  <div id="explore-header">
                     <h1>{this.state.currentProfile.username}'s Profile</h1>
                  </div>
                  <div id="explore-user-posts-content">
                     <button
                        id="return-button"
                        onClick={event => {
                           this.setState({ userPosts: [] });
                           this.setState({ showingProfile: false });
                        }}
                     >
                        Return to the general posting section
                     </button>
                     {this.state.userPosts.length > 0 ? (
                        this.state.userPosts.map((post, key) => (
                           <Post key={key} value={{ ...post, email }} />
                        ))
                     ) : (
                        <p id="no-post-message">The user hasn't posted yet.</p>
                     )}
                  </div>
               </div>
            )}
         </div>
      );
   }
}

export default withFirebase(ExplorePage);
