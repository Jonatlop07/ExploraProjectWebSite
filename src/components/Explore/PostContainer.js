import React, { Component } from "react";

import Post from "./Post.js";
import Stack from "../../data_structures/Stack/Stack.js";

class PostContainer extends Component {
   constructor(props) {
      super(props);

      this.state = {
         postsStack: new Stack(),
      };

      this.getPostsArray = this.getPostsArray.bind(this);
   }

   componentWillMount() {
      const posts = this.props.posts;
      Object.keys(posts).forEach(key => {
         this.state.postsStack.push({
            email: posts[key].email,
            title: posts[key].title,
            date: posts[key].date,
            article: posts[key].article,
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
      const postsComponents = this.getPostsArray();

      return (
         <div>
            <h1>{this.props.posts.id}:</h1>
            {postsComponents.map((post, key) => (
               <Post key={key} value={post} />
            ))}
         </div>
      );
   }
}

export default PostContainer;
