import { Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../HomePage.css";
import React, { useReducer, useContext } from "react";
import LoginPage from "./LoginPage";
import axios from "axios";
import { UserContext } from "../Context/userContext";
import { useHistory } from "react-router-dom";
// Initital state of login page state
const initialState = {
  userName: "",
  password: "",
  renderAlert: false,
  isLoggedIn: false,
};
// login page reducer
function loginReducer(state, action) {
  switch (action.type) {
    case "SET_USER_NAME":
      console.log(action);
      return { ...state, userName: action.email };
    case "SET_PASSWORD":
      return { ...state, password: action.password };
    case "RENDER_ALERT":
      return { ...state, renderAlert: action.render };
    default:
      throw state;
  }
}
// login page parent component
export const LoginPageContainerComponent = (props) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const userDetail = useContext(UserContext);
  let history = useHistory();

  const setEmail = (email) => {
    dispatch({ type: "SET_USER_NAME", email });
  };
  const setPassword = (password) => {
    dispatch({ type: "SET_PASSWORD", password });
  };
  const renderAlertBox = (render) => {
    dispatch({ type: "RENDER_ALERT", render });
  };

  const loginToApplication = () => {
   
    const { userName, password } = state;
    const userDetailsData = {
      email: userName,
      password: password,
    };
    // if username and password available do applicatoin login
    if (userName && password) {
      axios({
        method: "post",
        url: "http://localhost:8080/users/login",
        data: JSON.stringify(userDetailsData),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
      })
        .then((response) => {
   
          console.log(response);
          if (response.status === 200) {
            userDetail.authorization = response.headers.authorization;
            userDetail.userid = response.headers.userid;
            userDetail.isLoggedInSuccess = true;
            userDetail.renderNavigationBar = true;
            //once login success redirect to home page
            history.push("/home");
          } else {
            renderAlertBox(true);
          }
        })
        .catch((error) => {
          renderAlertBox(true);
        });
    }
  };

  return (
    <div id="page-space">
      <Alert
        key={"al1"}
        variant="danger"
        show={state.renderAlert}
        dismissible
        onClose={() => renderAlertBox(false)}
      >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>Login username or password is incorrect ,Authentication failed.</p>
      </Alert>
      <div id="login-container">
        <div>
          <Card border="primary" style={{ width: "30rem" }} bg="info">
            <Card.Body>
              <div>
                <center>
                <span style={{ color: "white", "fontSize": "34px" }}>
                  <strong>Log</strong>
                </span>
                <span style={{ color: "white", "fontSize": "34px","fontWeight": "100" }}>
                  <strong>One</strong>
                </span>
                </center>
              </div>
              <LoginPage setEmail={setEmail} setPassword={setPassword} />
              <div id="button-group">
                <Button variant="light" onClick={loginToApplication}>
                  Login
                </Button>
                <Link to="/register">
                  <Button  variant="light" >
                    Register
                  </Button>
                </Link>
              </div>

              <div id="button-right-align">
                
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
