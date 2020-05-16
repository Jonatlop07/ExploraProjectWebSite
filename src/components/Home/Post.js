import React, { Component } from "react";
import PostForm from "./PostForm";

class Post extends Component {
   constructor(props) {
      super(props);

      this.state = {
         editing: false,
         isShowing: false,
      };

      this.handleClickShowArticle = this.handleClickShowArticle.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handlePostEdit = this.handlePostEdit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handlePostDelete = this.handlePostDelete.bind(this);
   }

   componentWillMount() {
      const { id, title, date, topic, article } = this.props.post;
      this.setState({ id, title, date, topic, article });
   }

   handleChange(event) {}

   handleClickShowArticle(event) {
      this.setState({ isShowing: this.state.isShowing ? false : true });
   }

   handleClick() {
      this.setState({ editing: this.state.editing ? false : true });
   }

   handlePostEdit(event, postInformation) {
      this.props.onEdit(event, postInformation);
   }

   handlePostDelete(event) {
      this.props.onDelete(event, {
         postId: this.state.id,
         topic: this.state.topic,
      });
   }

   render() {
      const { title, date, topic, article } = this.state;

      if (this.props.post) {
         //RECORDAR QUE EL ID SE GUARDA!!

         return (
            <div>
               {!this.state.editing ? (
                  <div>
                     <p>{title}</p>
                     <p>Date: {date}</p>
                     <p>Topic: {topic}</p>
                     <button onClick={this.handleClickShowArticle}>
                        Let me see the content
                     </button>
                     {this.state.isShowing && <p>{article}</p>}
                     <button onClick={this.handleClick}>Edit</button>
                     <button onClick={this.handlePostDelete}>Delete</button>
                  </div>
               ) : (
                  <div>
                     <PostForm
                        postInfo={this.props.post}
                        onChange={this.handleChange}
                        onSubmit={this.handlePostEdit}
                     />
                     <button onClick={this.handleClick}>Cancel</button>
                  </div>
               )}
            </div>
         );
      } else {
         return <p>Error al cargar esta publicación</p>;
      }
   }
}

export default Post;
