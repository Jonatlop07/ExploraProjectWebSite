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

import * as ROUTES from "../../constants/routes.js";

import "./App.css";

function App() {
   const [isAuth, userAuthenticated] = useState(false);
   const [isAdmin, userRole] = useState(false);
   const [isDatabaseUpdated, onDatabaseUpdate] = useState(false);

   return (
      <Router>
         <div className="App">
            <Navigation
               auth={isAuth}
               admin={isAdmin}
               handleAuth={userAuthenticated}
               handleLogOut={userAuthenticated}
            />
            <Switch>
               <Route exact path={ROUTES.EXPLORE}>
                  <ExplorePage isUpdated={isDatabaseUpdated} />
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
                     <HomePage databaseUpdate={onDatabaseUpdate} />
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

            <footer>
               <dl>
                  <p>By @jonatlop</p>
                  <dt>Published on:</dt>
                  <dd>16 May 2020</dd>
               </dl>
               <a
                  id="icon-anchor"
                  href="https://icons8.com/icon/92773/documento"
               >
                  Documento icon by Icons8
               </a>
               <a
                  id="icon-anchor"
                  href="https://www.pexels.com/es-es/foto/arboles-arte-bonito-bosque-1539581/"
               >
                  Foto de Tim Mossholder en Pexels
               </a>
               Login Image by{" "}
               <a href="https://pixabay.com/users/ROverhate-1759589/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1354358">
                  Ronny Overhate
               </a>{" "}
               from{" "}
               <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1354358">
                  Pixabay
               </a>
               Login image background by{" "}
               <a href="https://pixabay.com/users/ROverhate-1759589/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1354358">
                  Ronny Overhate
               </a>{" "}
               from{" "}
               <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1354358">
                  Pixabay
               </a>
            </footer>
         </div>
      </Router>
   );
}

export default App;
