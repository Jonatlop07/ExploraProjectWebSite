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
      const { title, date, topic, article } = this.props.post;
      //RECORDAR QUE EL ID SE GUARDA!!
      return (
         <div>
            {this.props.post && (
               <div>
                  <p>{title}</p>
                  <p>Date: {date}</p>
                  <p>Topic: {topic}</p>
                  <button onClick={this.handleClick}>
                     Let me see the content
                  </button>
               </div>
            )}
            {this.state.isShowing && <p>{article}</p>}
         </div>
      );
   }
}

export default Post;
