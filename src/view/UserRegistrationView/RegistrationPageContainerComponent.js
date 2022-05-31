import React, { useReducer } from "react";
import RegisterationForm from "./RegisterationForm.js";
import * as lodash from "lodash";
import { Link } from "react-router-dom";
import { Row,  Alert, Card } from "react-bootstrap";
import { createUserAPI } from "../../services/UserServices";

// intital state of registration component
const registrationFormInitState = {
  alertBox: {
    render: false,
  },

  password2: "",
  email: "",
  password: "",
  resetForm: false,
};
// check if object have not null or undefined value
const isNullOrUndefined = (field) => {
  return field === null || field === undefined || lodash.trim(field) === "";
};
// validates the infromation filled by user is valid or not here
// email address ,password validtion
const isFormFiled = (regState) => {
  const blankFields = [];
  const { email, password, password2 } = regState;

  if (isNullOrUndefined(password)) {
    blankFields.push("enter password");
  }
  if (isNullOrUndefined(email)) {
    blankFields.push("enter your email id");
  }
  if (isNullOrUndefined(password2)) {
    blankFields.push("enter confirmation password");
  }
  if (password !== password2) {
    blankFields.push("passwords are not matching");
  }
  const isvalid = blankFields.length === 0;
  return [isvalid, blankFields];
};

// reducer for registration actions 
const registrationReducer = (regState, action) => {
  switch (action.type) {
    case "SET_USER_EMAIL_ID": {
      return { ...regState, email: action.email };
    }
    case "SET_USER_PASSWORD": {
      return { ...regState, password: action.password };
    }
    case "SET_USER_PASSWORD2": {
      return { ...regState, password2: action.password2 };
    }

    case "REGISTRATION_PAGE_RENDER_ALERT": {
      let { alertBox } = regState;
      alertBox = { render: action.render };
      return { ...regState, alertBox };
    }
    case "REGISTERATION_PAGE_STATE_RESET": {
      return {
        ...registrationFormInitState,
      };
    }
    default:
      throw regState;
  }
};

// container component for registration page 
export const RegistrationPageContainerComponent = (props) => {
  const [getState, dispatch] = useReducer(
    registrationReducer,
    registrationFormInitState
  );
  const renderAlertBox = (render) => {
    dispatch({ type: "REGISTRATION_PAGE_RENDER_ALERT", render });
  };
  const resetRegisterationPage = () => {
    dispatch({ type: "REGISTERATION_PAGE_STATE_RESET" });
  };

  const setUserEmailId = (email) => {
    dispatch({ type: "SET_USER_EMAIL_ID", email });
  };
  const setUserPassword = (password) => {
    dispatch({ type: "SET_USER_PASSWORD", password });
  };
  const setUserPassword2 = (password2) => {
    dispatch({ type: "SET_USER_PASSWORD2", password2 });
  };

  const submitForm = async () => {
    const [isvalid, blankFields] = isFormFiled(getState);
    if (isvalid) {
      const response = await createUserAPI(getState);
      console.log("Create user service called" + response);
      resetRegisterationPage();
      renderAlertBox(true);
    } else {
      console.log(blankFields);
    }
  };

  const { email, password, password2 } = getState;
  return (
    <div>
      <div id="login-container">
        <Card border="primary" style={{ width: "22rem" }} bg="info">
          <Card.Body>
            <div>
              <center>
                <span style={{ color: "white", "font-size": "34px" }}>
                  <strong>Log</strong>
                </span>
                <span
                  style={{
                    color: "white",
                    "font-size": "34px",
                    "font-weight": "100",
                  }}
                >
                  <strong>One</strong>
                </span>
                {/* <h3>Sign Up</h3> */}
              </center>
              <Row>
              
            </Row>
            </div>
          
            <Row>
              <Alert
                variant="success"
                key={"registration_completed_alert"}
                show={getState.alertBox.render}
                dismissible
                onClose={() => renderAlertBox(false)}
              >
                {`Your Account is created Successfully !! click here to `}
                <Link to="/"> Login </Link>
              </Alert>
            </Row>
          
              <RegisterationForm
                email={email}
                password={password}
                password2={password2}
                submitForm={submitForm}
                setUserPassword={setUserPassword}
                setUserPassword2={setUserPassword2}
                setUserEmailId={setUserEmailId}
              />
           
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
