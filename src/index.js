import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { UserContext ,userDetail} from "./Context/userContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { RegistrationPageContainerComponent } from "./view/UserRegistrationView/RegistrationPageContainerComponent";

import HomePage from "./view/HomeScreen/HomePage";
import RegisterationPage from "./view/Registration/RegisterationPage";

import Navigation from "./view/Navigation";
import Page404 from "./view/404Page";


const NavRoute = ({ exact, path, component: Component }) => (
  <Route
    exact={exact}
    path={path}
    render={(props) => (
      <div>
        <Navigation Component={Component}/>
       
      </div>
    )}
  />
);
// define Router path to all screen
ReactDOM.render(
  <Router>
    <UserContext.Provider value={userDetail}>
      <Switch>
        <Route exact path="/" component={(props) => <App {...props} />} />
        <Route
          exact
          path="/register"
          component={(props) => (
            <RegistrationPageContainerComponent {...props} />
          )}
        />
        <NavRoute
          exact
          path="/home"
          component={(props) => <HomePage {...props} />}
        />
        <NavRoute
          exact
          path="/RegisterationPage"
          component={(props) => <RegisterationPage {...props} />}
        />
 
        <NavRoute
          exact
          path="*"
          component={(props) => <Page404 {...props} />}
        />
      </Switch>
    </UserContext.Provider>
  </Router>,
  document.getElementById("app")
);
