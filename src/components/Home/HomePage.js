import React, { Component } from "react";

import { withFirebase } from "../Firebase/index.js";

import { mainTopics } from "./topics.js";
import PostContainer from "./PostContainer.js";

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

   handleSubmit(event) {
      const { title, date, topic, article } = this.state;

      const newPublication = {
         title,
         date,
         topic,
         article,
      };

      const { email, uid } = this.props.firebase.auth.currentUser;

      this.props.firebase.userPosts(uid).push(newPublication);
      this.props.firebase.pushByTopic(topic, {
         email,
         ...newPublication,
      });

      this.state.myPosts.push(newPublication);
      this.setState({ editing: false });

      this.handleDatabaseUpdate(false);
      event.preventDefault();
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
      });
   }

   render() {
      const {
         title,
         date,
         topic,
         article,
         error,
         mainTopics,
         myPosts,
      } = this.state;

      const isInvalid =
         title === "" ||
         article === "" ||
         topic === "" ||
         topic === "-" ||
         date === "";

      return (
         <div>
            <h1>HomePage</h1>
            <p>The Home Page is accessible by every signed in user.</p>

            {this.state.editing ? (
               <div>
                  <form onSubmit={this.handleSubmit}>
                     <input
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Title"
                     />
                     <input
                        name="date"
                        value={date}
                        onChange={this.handleChange}
                        type="date"
                        placeholder="Date of creation"
                     />
                     <section>
                        <label htmlFor="topic">
                           Select the topic of your text:{" "}
                        </label>
                        <select
                           name="topic"
                           value={topic}
                           onChange={this.handleChange}
                        >
                           {mainTopics.map((topic, index) => (
                              <option key={index} value={topic}>
                                 {topic}
                              </option>
                           ))}
                        </select>
                     </section>
                     <textarea
                        name="article"
                        value={article}
                        onChange={this.handleChange}
                        placeholder="This is the body of your post"
                     />
                     <button disabled={isInvalid} type="submit">
                        Post it
                     </button>

                     {error && <p>{error.message}</p>}
                  </form>
                  <button onClick={this.handleClick}>Cancel</button>
               </div>
            ) : (
               <div>
                  <button onClick={this.handleClick}>New post</button>
                  {myPosts.length > 0 ? (
                     <PostContainer posts={myPosts} />
                  ) : (
                     <p>There is no posts from you</p>
                  )}
               </div>
            )}
         </div>
      );
   }
}

export default withFirebase(HomePage);
