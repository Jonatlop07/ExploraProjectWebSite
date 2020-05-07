import React, { Component } from "react";

import "./LoginForm.css";

export default class LoginForm extends Component {
   render() {
      return (
         <div>
            <form>
               <input
                  type="email"
                  name="email"
                  required
                  placeholder="Ej: userexample@email.smt"
               />
               <input
                  type="password"
                  name="password"
                  required
                  minLength="6"
                  maxLength="16"
               />
               <input type="submit" name="login" />
            </form>

            <button>Registrarse</button>
         </div>
      );
   }
}
