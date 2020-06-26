import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";

import "./styles/Post.css";

class Post extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isShowing: false,
      };

      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(event) {
      this.setState({ isShowing: this.state.isShowing ? false : true });
   }

   render() {
      const { title, date, article, email, url } = this.props.value;

      if (title && date && article && email) {
         return (
            <article className="public-post">
               <div className="post-info">
                  {title && <p className="public-post-title">{title}</p>}
                  {email && <p className="public-post-email">By {email}</p>}
                  {date && <p className="public-post-date">Date: {date}</p>}
                  {article && (
                     <button
                        className="public-post-show-content"
                        onClick={this.handleClick}
                     >
                        See the content
                     </button>
                  )}
               </div>
               {this.state.isShowing && (
                  <div className="post-body">
                     <div className="public-post-article">
                        {ReactHtmlParser(article)}
                        {url && (
                           <iframe
                              src={url}
                              width="500"
                              height="400"
                              scrolling="no"
                              frameBorder="0"
                              allowFullScreen={true}
                           ></iframe>
                        )}
                     </div>
                  </div>
               )}
            </article>
         );
      } else {
         return <p></p>;
      }
   }
}

export default Post;
