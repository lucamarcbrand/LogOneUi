import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Button, Col, Container, Alert } from "react-bootstrap";
import { updateUserDetailService } from "../../services/UserServices";
const initFormState = {
  userId: "",
  firstName: "",
  lastName: "",
  mobileNumber: "",
  password: "",
  address: {
    street: "",
    postcode: "",
    place: "",
  },
  invoiceAddress: {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    street: "",
    postcode: "",
    place: "",
  },
};
import { UserContext } from "../../Context/userContext";
export default (props) => {
  const userDetailsData = useContext(UserContext);

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: userDetailsData.authorization,
  };
  const [state, setFormState] = useState(initFormState);
  const [validated, setValidated] = useState(false);
  const [alertBox, setAlertBoxVisibility] = useState({
    render: false,
    message: "",
  });
  const [isInvoiceAddressSame, setInvoiceAddressSame] = useState(false);
  const handleSameAddressToggle = (checked) => {
    setFormState((prevState) => ({
      ...prevState,
      invoiceAddress: {
        firstName: prevState.firstName,
        lastName: prevState.lastName,
        mobileNumber: prevState.mobileNumber,
        street: prevState.address.street,
        postcode: prevState.address.postcode,
        place: prevState.address.place,
      },
    }));

    setInvoiceAddressSame(checked);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      let data = state;
      data.userId = userDetailsData.userid;

      updateUserDetailService(defaultHeaders, data)
        .then((result) => {
          setValidated(false);
          closeAlertBox(true, "Profile updated !!");
          props.setProfile(result);
          event.preventDefault();
        })
        .catch((err) => {
          setValidated(true);
          event.preventDefault();
        });
    }
    setValidated(true);
    event.preventDefault();
  };

  const closeAlertBox = (render, message) => {
    setAlertBoxVisibility((prevState) => ({
      ...prevState,
      render: render,
      message: message,
    }));
  };
  useEffect(() => {
    setFormState({
      ...initFormState,
      firstName: props.profileInfo.firstName ? props.profileInfo.firstName : "",
      lastName: props.profileInfo.lastName ? props.profileInfo.lastName : "",
      mobileNumber: props.profileInfo.mobileNumber
        ? props.profileInfo.mobileNumber
        : "",
      address: props.profileInfo.address
        ? props.profileInfo.address
        : initFormState.address,
      invoiceAddress: props.profileInfo.invoiceAddress
        ? props.profileInfo.invoiceAddress
        : initFormState.invoiceAddress,
    });
  }, [props.profileInfo]);
  const onFormEdit = (field, value, nestedObjectName = "root") => {
    if (nestedObjectName === "root") {
      state[field] = value;
    } else {
      state[nestedObjectName][field] = value;
    }
    setFormState((prevState) => ({ ...prevState, ...state }));
  };
  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Alert
            variant="success"
            key={"registration_completed_alert"}
            show={alertBox.render}
            dismissible
            onClose={() => closeAlertBox(false)}
          >
            {alertBox.message}
          </Alert>
        </Row>

        <Row>
          <Form.Group controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={state.firstName}
              onChange={(e) => onFormEdit("firstName", e.target.value, "root")}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={state.lastName}
              onChange={(e) => onFormEdit("lastName", e.target.value, "root")}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="validationCustom034">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Mobile Number"
              value={state.mobileNumber}
              onChange={(e) =>
                onFormEdit("mobileNumber", e.target.value, "root")
              }
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="validationCustom05">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Street"
              required
              value={state.address.street}
              onChange={(e) => onFormEdit("street", e.target.value, "address")}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="validationCustom055">
            <Form.Label>Postal code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Postal code"
              required
              value={state.address.postcode}
              onChange={(e) =>
                onFormEdit("postcode", e.target.value, "address")
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Landmark.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="validationCustom03">
            <Form.Label>Place</Form.Label>
            <Form.Control
              type="text"
              placeholder="Place"
              required
              value={state.address.place}
              onChange={(e) => onFormEdit("place", e.target.value, "address")}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => onFormEdit("password", e.target.value, "root")}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            Invoice address as delivery address{" "}
            <Form.Check
              type="switch"
              id="custom-switch"
              label=""
              onChange={(e) => handleSameAddressToggle(e.target.checked)}
            />
          </Col>
        </Row>
        {isInvoiceAddressSame ? undefined : (
          <>
            <Row>
              <Form.Group controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  value={state.invoiceAddress.firstName}
                  onChange={(e) =>
                    onFormEdit("firstName", e.target.value, "invoiceAddress")
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  value={state.invoiceAddress.lastName}
                  onChange={(e) =>
                    onFormEdit("lastName", e.target.value, "invoiceAddress")
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="validationCustom034">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Mobile Number"
                  value={state.invoiceAddress.mobileNumber}
                  onChange={(e) =>
                    onFormEdit("mobileNumber", e.target.value, "invoiceAddress")
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group controlId="validationCustom05">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Street"
                  required
                  value={state.invoiceAddress.street}
                  onChange={(e) =>
                    onFormEdit("street", e.target.value, "invoiceAddress")
                  }
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="validationCustom055">
                <Form.Label>Postal code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Postal code"
                  required
                  value={state.invoiceAddress.postcode}
                  onChange={(e) =>
                    onFormEdit("postcode", e.target.value, "invoiceAddress")
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Landmark.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="validationCustom03">
                <Form.Label>Place</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Place"
                  required
                  value={state.invoiceAddress.place}
                  onChange={(e) =>
                    onFormEdit("place", e.target.value, "invoiceAddress")
                  }
                />
              </Form.Group>
            </Row>
          </>
        )}
        <div style={{ paddingTop: "20px" }}>
          <div style={{ paddingLeft: "20px", float: "left" }}>
            <Button type="submit">Save</Button>
          </div>
          <div style={{ paddingRight: "20px", float: "right" }}>
            <Link to="/">
              <Button variant="outline-primary">Logout</Button>
            </Link>
          </div>
        </div>
      </Form>
    </Container>
  );
};
