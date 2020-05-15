import React, { Component } from "react";

import Post from "./Post.js";
import Stack from "../../data_structures/Stack/Stack.js";

class PostContainer extends Component {
   constructor(props) {
      super(props);

      this.state = {
         loading: false,
         postsStack: new Stack(),
      };

      this.loadObjectsIntoStack = this.loadObjectsIntoStack.bind(this);
      this.getPostsArray = this.getPostsArray.bind(this);
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

   render() {
      const postArray = this.getPostsArray();
      return (
         <div>
            {this.state.loading && <p>Loading ...</p>}
            {postArray.map(post => (
               <Post key={post.id} post={post} />
            ))}
         </div>
      );
   }
}

export default PostContainer;
