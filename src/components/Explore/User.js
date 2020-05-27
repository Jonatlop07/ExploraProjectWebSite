import React, { Component } from "react";

import "./styles/User.css";

const User = props => {
   const seeProfile = event => {
      props.onSelect(props.userInfo);
   };

   return (
      <div className="user-space">
         <p className="user-info">{props.userInfo.username}</p>
         <p className="user-info">{props.userInfo.email}</p>
         <button className="user-post-button" onClick={seeProfile}>
            See profile
         </button>
         <hr />
      </div>
   );
};

export default User;
