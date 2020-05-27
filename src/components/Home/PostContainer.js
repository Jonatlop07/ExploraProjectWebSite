import React, { Component } from "react";

import Post from "./Post.js";
import Stack from "../../data_structures/Stack/Stack.js";

import "./styles/PostContainer.css";

class PostContainer extends Component {
   constructor(props) {
      super(props);

      this.state = {
         postsArray: [],
      };

      this.setPostsArray = this.setPostsArray.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
   }

   componentWillMount() {
      this.setPostsArray();
   }

   componentWillReceiveProps(nextProps) {
      if (!nextProps.posts === this.state.postsArray) {
         this.state.postsArray = nextProps.posts.reverse();
      }
   }

   setPostsArray() {
      this.setState({ postsArray: this.props.posts.reverse() });
   }

   handleEdit(event, postInformation) {
      this.props.onEdit(event, postInformation);
   }

   handleDelete(event, postInfo) {
      this.props.onDelete(event, postInfo);
   }

   render() {
      return (
         <section className="home-post-container">
            {this.state.postsArray.map(post => (
               <Post
                  key={post.id}
                  post={post}
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}
               />
            ))}
         </section>
      );
   }
}

export default PostContainer;
