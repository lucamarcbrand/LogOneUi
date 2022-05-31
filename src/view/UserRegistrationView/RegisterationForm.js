import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

// registration page to create new user 
// get email address and password from user and send it to backend 
export default (props) => {
  const { email, password, password2 } = props;


  const submitForm = (e) => {
    e.preventDefault();
    console.log("form submitted");
    props.submitForm();
  };

  return (
    <div>
      <Form>
        <Row>
          <Col>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => props.setUserEmailId(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => props.setUserPassword(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => props.setUserPassword2(e.target.value)}
            />
          </Col>
        </Row>

        <div style={{ paddingTop: "2%" }}>
          <center>
            <Button
              variant="light"
              type="submit"
              onClick={(e) => submitForm(e)}
            >
              Register
            </Button>
          </center>
        </div>
      </Form>
    </div>
  );
};
