import React, { Component } from "react";

import { withAuthorization } from "../Session/Session.js";

class HomePage extends Component {
   constructor(props) {
      super(props);

      this.state = {
         editing: false,
      };

      this.handleClick = this.handleClick.bind(this);
   }

   handleClick() {
      this.setState({ editing: this.state.editing ? false : true });
   }

   render() {
      return (
         <div>
            <h1>HomePage</h1>
            <p>The Home Page is accessible by every signed in user.</p>

            {this.state.editing ? (
               <div>
                  <PostForm
                     firebase={this.props.firebase}
                     authUser={this.props.authUser}
                  />
                  <button onClick={this.handleClick}>Finish edition</button>
               </div>
            ) : (
               <button onClick={this.handleClick}>New post</button>
            )}
         </div>
      );
   }
}

const INITIAL_STATE = {
   title: "",
   date: "",
   topic: "",
   article: "",
   error: null,
};

const TOPICS = ["", "Videogames", "Arts", "Books"];

class PostForm extends Component {
   constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   handleSubmit(event) {
      this.props.firebase.post(this.props.authUser.uid).push(this.state);
      this.props.history.push(ROUTES.HOME);
      event.preventDefault();
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
      });
   }

   render() {
      const { title, date, topic, article, error } = this.state;

      const isInvalid = title === "" || article === "" || topic === "";

      const optionTopics = TOPICS.map((topic, index) => (
         <option key={index} value={topic}>
            {topic}
         </option>
      ));

      return (
         <div>
            <form onSubmit={this.handleSubmit}>
               <input
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Username"
               />
               <input
                  name="date"
                  value={date}
                  onChange={this.handleChange}
                  type="date"
                  placeholder="Date of creation"
               />
               <section>
                  <label htmlFor="topic">Select the topic of your text: </label>
                  <select
                     name="topic"
                     value={topic}
                     onChange={this.handleChange}
                  >
                     {optionTopics}
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
      );
   }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
