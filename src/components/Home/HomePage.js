import React, { Component } from "react";

import { withAuthorization } from "../Session/Session.js";

class HomePage extends Component {
   render() {
      return (
         <div>
            <h1>HomePage</h1>
            <p>The Home Page is accessible by every signed in user.</p>
         </div>
      );
   }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
