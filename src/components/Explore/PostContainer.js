import React, { Component } from "react";

import Post from "./Post.js";

import "./styles/PostContainer.css";

class PostContainer extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isShowing: false,
         posts: [],
      };

      this.handleClick = this.handleClick.bind(this);
   }

   handleClick() {
      this.setState({ isShowing: this.state.isShowing ? false : true });
   }

   componentWillMount() {
      const posts = [];
      Object.keys(this.props.posts).forEach(key => {
         posts.push({
            email: this.props.posts[key].email,
            title: this.props.posts[key].title,
            date: this.props.posts[key].date,
            article: this.props.posts[key].article,
            url: this.props.posts[key].url,
         });
      });
      this.setState({ posts: posts.reverse() });
   }

   render() {
      const postsComponents = this.state.posts;

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
