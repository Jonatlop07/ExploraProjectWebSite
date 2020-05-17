import React, { Component } from "react";

import { mainTopics } from "./topics.js";

import "./PostForm.css";

const INITIAL_STATE = {
   title: "",
   date: "",
   topic: "",
   article: "",
   error: null,
};

class PostForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         ...INITIAL_STATE,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   componentWillMount() {
      if (this.props.postInfo) {
         const { title, date, topic, article } = this.props.postInfo;
         this.setState({
            title,
            date,
            topic,
            article,
         });
      }
   }

   handleSubmit(event) {
      this.props.onSubmit(
         event,
         this.props.postInfo
            ? {
                 postId: this.props.postInfo.id,
                 title: this.state.title,
                 date: this.state.date,
                 topic: this.state.topic,
                 article: this.state.article,
              }
            : {}
      );
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
      });

      this.props.onChange(event);
   }

   render() {
      const { title, date, topic, article, error } = this.state;

      const isInvalid =
         title === "" ||
         article === "" ||
         topic === "" ||
         topic === "-" ||
         date === "";

      return (
         <div className="form-container">
            <form className="post-form" onSubmit={this.handleSubmit}>
               <input
                  className="new-post-input"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Title"
               />
               <input
                  className="new-post-input"
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
                     {mainTopics.map((topic, index) => (
                        <option key={index} value={topic}>
                           {topic}
                        </option>
                     ))}
                  </select>
               </section>
               <textarea
                  className="article-text-area"
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
         </div>
      );
   }
}

export default PostForm;
