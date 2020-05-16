import React, { Component } from "react";

import Post from "./Post.js";
import Stack from "../../data_structures/Stack/Stack.js";

class PostContainer extends Component {
   constructor(props) {
      super(props);

      this.state = {
         postsStack: new Stack(),
      };

      this.loadObjectsIntoStack = this.loadObjectsIntoStack.bind(this);
      this.getPostsArray = this.getPostsArray.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
   }

   componentWillMount() {
      this.loadObjectsIntoStack();
   }

   loadObjectsIntoStack() {
      const posts = this.props.posts;
      posts.forEach(post => {
         this.state.postsStack.push({
            id: post.id,
            title: post.title,
            date: post.date,
            topic: post.topic,
            article: post.article,
         });
      });
   }

   getPostsArray() {
      const postsList = [];
      const postsStack = this.state.postsStack;
      while (!postsStack.isEmpty()) {
         postsList.push(postsStack.pop());
      }

      return postsList;
   }

   handleEdit(event, postInformation) {
      this.props.onEdit(event, postInformation);
   }

   handleDelete(event, postInfo) {
      this.props.onDelete(event, postInfo);
   }

   render() {
      const postArray = this.getPostsArray();
      return (
         <div>
            {postArray.map(post => (
               <Post
                  key={post.id}
                  post={post}
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}
               />
            ))}
         </div>
      );
   }
}

export default PostContainer;
