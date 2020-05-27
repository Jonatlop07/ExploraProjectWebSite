import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";

import PostForm from "./PostForm";

import "./styles/Post.css";

class Post extends Component {
   constructor(props) {
      super(props);

      this.state = {
         editing: false,
         isShowing: false,
      };

      this.handleClickShowArticle = this.handleClickShowArticle.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handlePostEdit = this.handlePostEdit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handlePostDelete = this.handlePostDelete.bind(this);
   }

   componentWillMount() {
      const { id, title, date, topic, article } = this.props.post;
      this.setState({ id, title, date, topic, article });
   }

   handleChange(event) {}

   handleClickShowArticle(event) {
      this.setState({ isShowing: this.state.isShowing ? false : true });
   }

   handleClick() {
      this.setState({ editing: this.state.editing ? false : true });
   }

   handlePostEdit(event, postInformation) {
      this.props.onEdit(event, postInformation);
      this.setState({ editing: this.state.editing ? false : true });
   }

   handlePostDelete(event) {
      this.props.onDelete(event, {
         postId: this.state.id,
         topic: this.state.topic,
         date: this.state.date,
      });
   }

   render() {
      const { title, date, topic, article } = this.state;

      if (this.props.post) {
         if (!this.state.editing) {
            return (
               <article className="home-user-post-container">
                  <div className="home-user-post-info">
                     <p className="user-post-title">{title}</p>
                     <p className="user-post-date">Date: {date}</p>
                     <p className="user-post-topic"> Topic: {topic}</p>
                     <button
                        className="user-post-show-content"
                        onClick={this.handleClickShowArticle}
                     >
                        See the content
                     </button>
                     <button
                        className="user-edit-post"
                        onClick={this.handleClick}
                     >
                        Edit
                     </button>
                     <button
                        className="user-delete-post"
                        onClick={this.handlePostDelete}
                     >
                        Delete
                     </button>
                  </div>
                  <div className="user-post-body">
                     {this.state.isShowing && ReactHtmlParser(article)}
                  </div>
               </article>
            );
         } else {
            return (
               <article className="user-post-form">
                  <PostForm
                     postInfo={this.props.post}
                     onChange={this.handleChange}
                     onSubmit={this.handlePostEdit}
                  />
                  <button
                     className="user-cancel-form"
                     onClick={this.handleClick}
                  >
                     Cancel
                  </button>
               </article>
            );
         }
      } else {
         return <p>Error al cargar esta publicación</p>;
      }
   }
}

export default Post;
