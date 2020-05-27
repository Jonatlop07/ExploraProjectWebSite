import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { mainTopics } from "./topics.js";

import "./styles/PostForm.css";

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
      let postInfo;
      if (this.props.postInfo) {
         postInfo = {
            postId: this.props.postInfo.id,
            title: this.state.title,
            date: this.state.date,
            topic: this.state.topic,
            article: this.state.article,
         };
      } else {
         postInfo = {
            title: this.state.title,
            date: this.state.date,
            topic: this.state.topic,
            article: this.state.article,
         };
      }

      this.props.onSubmit(event, postInfo);
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
      });
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

               <hr />
               <br />
               <p>Write your post here:</p>

               <div className="text-editor">
                  <Editor
                     initialValue={article}
                     init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                           "advlist autolink lists link image charmap print preview anchor",
                           "searchreplace visualblocks code fullscreen",
                           "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                           "undo redo | fontselect fontsizeselect forecolor | \
                           formatselect | bold italic backcolor underline | \
                           subscript superscript | casechange emoticons image | \
                           alignleft aligncenter alignright alignjustify | \
                           bullist numlist outdent indent | removeformat | help",
                     }}
                     onEditorChange={(content, editor) => {
                        this.setState({ article: content });
                     }}
                  />
               </div>

               <button disabled={isInvalid} type="submit">
                  Post it
               </button>

               {error && <p className="error-msg">{error.message}</p>}
            </form>
         </div>
      );
   }
}

export default PostForm;
