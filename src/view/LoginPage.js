import React, { useReducer } from "react";

import { Form } from "react-bootstrap";
// login page component renders email and password input box on screen
const LoginPage = (props) => {
  const changeEmail = (email) => {
    props.setEmail(email);
  };
  const changePassword = (pwd) => {
    props.setPassword(pwd);
  };
  return (
    <div>
      <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => changeEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => changePassword(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginPage;
