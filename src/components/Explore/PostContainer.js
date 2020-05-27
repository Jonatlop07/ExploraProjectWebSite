import React, { Component } from "react";

import Post from "./Post.js";
import Stack from "../../data_structures/Stack/Stack.js";

import "./styles/PostContainer.css";

class PostContainer extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isShowing: false,
         postsStack: new Stack(),
      };

      this.getPostsArray = this.getPostsArray.bind(this);
      this.handleClick = this.handleClick.bind(this);
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

   componentWillUpdate() {
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

   handleClick() {
      this.setState({ isShowing: this.state.isShowing ? false : true });
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
         <section className="topic-post-section">
            <div className="topic-name-div">
               <h1 className="topic-name">{this.props.posts.id}</h1>
               <button
                  className="topic-button"
                  onClick={this.handleClick}
               ></button>
            </div>
            {this.state.isShowing ? (
               postsComponents.map((post, key) => (
                  <Post key={key} value={post} />
               ))
            ) : (
               <p className="post-instruction">
                  Click in the arrow button to see the posts
               </p>
            )}
         </section>
      );
   }
}

export default PostContainer;
