import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar.js";
import Home from "../../pages/Home.js";
import Login from "../../pages/Login.js";

import logo from "../../logo.svg";
import "./App.css";

function App() {
   const [] = React.useState(false);
   return (
      <Router>
         <NavBar />
         <div>
            <Switch>
               <Route path="/login">
                  <Login />
               </Route>
               <Route path="/">
                  <Home />
               </Route>
            </Switch>
         </div>
      </Router>
   );
}

export default App;
