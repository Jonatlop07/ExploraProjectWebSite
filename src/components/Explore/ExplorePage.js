import React, { Component } from "react";

import PostContainer from "./PostContainer.js";

import { withFirebase } from "../Firebase/index.js";

class ExplorePage extends Component {
   constructor(props) {
      super(props);

      this.state = {
         updated: false,
         postContainers: [],
      };

      this.handleDatabaseUpdate = this.handleDatabaseUpdate.bind(this);
      this.updateDatabase = this.updateDatabase.bind(this);
   }

   handleDatabaseUpdate(isDatabaseUpdated) {
      this.props.databaseUpdate(isDatabaseUpdated);
   }

   updateDatabase() {
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
   }

   componentDidMount() {
      this.setState({ updated: true });

      this.updateDatabase();

      this.handleDatabaseUpdate(true);
   }

   componentWillUnmount() {
      this.props.firebase.posts().off();
      this.handleDatabaseUpdate(false);
   }

   render() {
      if (this.state.postContainers.length == 0) {
         this.updateDatabase();
      }
      return (
         <div>
            <h1>PublicationsPage</h1>
            {this.state.postContainers &&
               this.state.postContainers.map((posts, key) => (
                  <PostContainer key={key} posts={posts} />
               ))}
         </div>
      );
   }
}

export default withFirebase(ExplorePage);
