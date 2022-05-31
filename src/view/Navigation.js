import React, { useContext, Fragment, useState, useEffect } from "react";
import { Navbar, Col, Image, Nav } from "react-bootstrap";

import { UserContext } from "../Context/userContext";
import man from "../static/Resource/man2-256.png";
import { Profile } from "../view/ProfileScreen/Profile";
import { getUserDetailByUserIdAPI } from "../services/UserServices";
const profilePicStyle = { height: "25px", width: "25px" };
// top navigation bar component
const Navigation = ({ Component }) => {
  const userDetailsData = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    if (
      userDetailsData &&
      userDetailsData.authorization &&
      userDetailsData.userid
    ) {
      fetchUserDetails(userDetailsData);
    }
  }, []);

  //fetched the user profile information
  const fetchUserDetails = (userDetailsData) => {
    const headers = {
      "Content-type": "application/json",
      Authorization: userDetailsData.authorization,
      accept: "application/json",
    };
// api call to get user profile
    getUserDetailByUserIdAPI(userDetailsData.userid, headers)
      .then((userDetails) => {
        if (userDetails) {
          setProfile(userDetails);
        }
      })
      .catch((error) => console.error(error));
  };
  const naviagtionComponent = (prop) => {
    return (
      <div>
        <header>
          <Navbar bg="light" variant="light">
            <Nav className="me-auto">
              <Navbar.Brand>
                <div style={{ paddingLeft: "35px" }}>
                  <strong>Log</strong>One
                </div>
              </Navbar.Brand>
            </Nav>
            <Col xs={1} md={1}>
              <Image
                src={man}
                roundedCircle
                style={profilePicStyle}
                onClick={() => setShow(true)}
              />
            </Col>
          </Navbar>
        </header>
        <Component profile={profile} showProfiile={setShow} setProfile={setProfile} />
        <Profile profileInfo={profile} show={show} handleClose={handleClose} setProfile={setProfile}></Profile>
      </div>
    );
  };

  return (
    <Fragment>
      {userDetailsData.renderNavigationBar
        ? naviagtionComponent({ image: undefined })
        : undefined}
    </Fragment>
  );
};

export default Navigation;
