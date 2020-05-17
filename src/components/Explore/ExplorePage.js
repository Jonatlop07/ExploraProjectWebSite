import React, { Component } from "react";

import PostContainer from "./PostContainer.js";

import { withFirebase } from "../Firebase/index.js";

import "./ExplorePage.css";

class ExplorePage extends Component {
   constructor(props) {
      super(props);

      this.state = {
         updated: this.props.isUpdated,
         postContainers: [],
      };

      this.updateFromDatabase = this.updateFromDatabase.bind(this);
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

   render() {
      return (
         <div className="explore-main">
            <div className="header-explora">
               <h1>Welcome to Explora Projects Website</h1>
            </div>
            {
               <div className="post-section-div">
                  {this.state.postContainers.length > 0 &&
                     this.state.postContainers.map((posts, key) => (
                        <PostContainer key={key} posts={posts} />
                     ))}
               </div>
            }
         </div>
      );
   }
}

export default withFirebase(ExplorePage);
