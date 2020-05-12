import React, { useState } from "react";
import {
   BrowserRouter as Router,
   Route,
   Redirect,
   Switch,
} from "react-router-dom";

import Navigation from "../Navigation/Navigation.js";
import ExplorePage from "../Explore/ExplorePage.js";
import SignUpPage from "../SignUp/SignUp.js";
import SignInPage from "../SignIn/SignIn.js";
import PasswordForgetPage from "../PasswordForget/PasswordForget.js";
import HomePage from "../Home/HomePage.js";
import AccountPage from "../Account/AccountPage.js";
import AdminPage from "../Admin/AdminPage.js";
import SignOutButton from "../SignOut/SignOutButton.js";

import * as ROUTES from "../../constants/routes.js";

import "./App.css";

function App() {
   const [isAuth, userAuthenticated] = useState(false);
   const [isAdmin, userRole] = useState(true);
   const [isDatabaseUpdated, onDatabaseUpdate] = useState(false);

   return (
      <Router>
         <div>
            <Navigation auth={isAuth} handleAuth={userAuthenticated} />
            {isAuth && <SignOutButton handleLogOut={userAuthenticated} />}
            <hr />
            <Switch>
               <Route exact path={ROUTES.EXPLORE}>
                  <ExplorePage databaseUpdate={onDatabaseUpdate} />
               </Route>

               <Route exact path={ROUTES.SIGN_IN}>
                  {isAuth ? (
                     <Redirect to={ROUTES.HOME} />
                  ) : (
                     <SignInPage handleAuth={userAuthenticated} />
                  )}
               </Route>

               <Route exact path={ROUTES.SIGN_UP}>
                  {isAuth ? (
                     <Redirect to={ROUTES.HOME} />
                  ) : (
                     <SignUpPage handleAuth={userAuthenticated} />
                  )}
               </Route>

               <Route exact path={ROUTES.HOME}>
                  {isAuth ? (
                     <HomePage
                        handleAuth={userAuthenticated}
                        databaseUpdate={onDatabaseUpdate}
                     />
                  ) : (
                     <Redirect to={ROUTES.SIGN_IN} />
                  )}
               </Route>

               <Route exact path={ROUTES.ACCOUNT}>
                  {isAuth ? <AccountPage /> : <Redirect to={ROUTES.SIGN_IN} />}
               </Route>

               <Route exact path={ROUTES.PASSWORD_FORGET}>
                  {isAuth ? (
                     <Redirect to={ROUTES.ACCOUNT} />
                  ) : (
                     <PasswordForgetPage />
                  )}
               </Route>

               <Route exact path={ROUTES.ADMIN}>
                  {isAuth && isAdmin ? (
                     <AdminPage />
                  ) : (
                     <Redirect to={ROUTES.EXPLORE} />
                  )}
               </Route>
            </Switch>
         </div>
      </Router>
   );
}

export default App;
