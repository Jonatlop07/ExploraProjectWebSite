import React, { Component } from "react";

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
      const { title, date, article, email } = this.props.value;
      return (
         <div>
            {title && <p>{title}</p>}
            {email && <span>By {email}</span>}
            {date && <span>Date: {date}</span>}
            {article && (
               <button onClick={this.handleClick}>
                  Let me see the content
               </button>
            )}
            {this.state.isShowing && <p>{article}</p>}
         </div>
      );
   }
}

export default Post;