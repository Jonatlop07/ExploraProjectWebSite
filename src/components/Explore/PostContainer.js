import React, { Component } from "react";

import Post from "./Post.js";

class PostContainer extends Component {
   constructor(props) {
      super(props);

      this.state = {
         loading: false,
      };
   }

   render() {
      const postsComponents = [];
      const posts = this.props.posts;
      Object.keys(posts).forEach(key => {
         postsComponents.push({
            email: posts[key].email,
            title: posts[key].title,
            date: posts[key].date,
            article: posts[key].article,
         });
      });
      return (
         <div>
            <h1>{this.props.posts.id}:</h1>
            {this.state.loading && <p>Loading ...</p>}
            {postsComponents.map((post, key) => (
               <Post key={key} value={post} />
            ))}
         </div>
      );
   }
}

export default PostContainer;
