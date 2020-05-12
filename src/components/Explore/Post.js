import React, { Component } from "react";

class Post extends Component {
   constructor(props) {
      super(props);

      this.state = {
         showing: false,
      };

      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(event) {
      this.setState({ showing: this.state.showing ? false : true });
   }

   render() {
      const { title, date, article, email } = this.props.value;
      return (
         <div>
            {title && <button onClick={this.handleClick}>{title}</button>}
            {email && <span>By {email}</span>}
            {date && <span>Date: {date}</span>}
            {this.state.showing && <p>{article}</p>}
         </div>
      );
   }
}

export default Post;
