import React, { Component } from "react";

import { withFirebase } from "../Firebase/index.js";

import { mainTopics } from "./topics.js";

const INITIAL_STATE = {
   editing: false,
   title: "",
   date: "",
   topic: "",
   article: "",
   error: null,
};

class HomePage extends Component {
   constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE, mainTopics, myPosts: [] };

      this.handleClick = this.handleClick.bind(this);
      this.handleDatabaseUpdate = this.handleDatabaseUpdate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   handleClick() {
      this.setState({ editing: true });
   }

   handleDatabaseUpdate(isDatabaseUpdated) {
      this.props.databaseUpdate(isDatabaseUpdated);
      this.props.handleAuth(true);
   }

   handleSubmit(event) {
      const { title, date, topic, article } = this.state;

      const { email, uid } = this.props.firebase.auth.currentUser;

      this.props.firebase.post(uid).push({
         title,
         date,
         topic,
         article,
      });

      let username = "";

      this.props.firebase.pushByTopic(topic, {
         email,
         title,
         date,
         topic,
         article,
      });

      this.setState({ editing: false });
      this.handleDatabaseUpdate(true);
      event.preventDefault();
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
      });
   }

   render() {
      const { title, date, topic, article, error, mainTopics } = this.state;

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
                     <input
                        name="article"
                        value={article}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="This is the body of your post"
                     />
                     <button disabled={isInvalid} type="submit">
                        Post it
                     </button>

                     {error && <p>{error.message}</p>}
                  </form>
               </div>
            ) : (
               <button onClick={this.handleClick}>New post</button>
            )}
         </div>
      );
   }
}

export default withFirebase(HomePage);
