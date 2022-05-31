import React, { useContext, useEffect, useReducer, useState } from "react";
import { UserContext } from "../../Context/userContext";
import { Profile } from "../ProfileScreen/Profile";
import { Card, Button, Container } from "react-bootstrap";
import { CartPage } from "../Cart/CartPage";

import ProfileIcon from "../../static/Resource/man2-256.png";

const homePageInitialState = {
  userDetails: undefined,
  profilePic: ProfileIcon,
};

function convertBlob(blob) {
  return URL.createObjectURL(blob);
}
function reducer(state, action) {
  switch (action.type) {
    case "INVALID_USER":
      console.log(action);
      return { ...state, isLoggedInSuccess: false };
    case "VALID_USER": {
      return {
        ...state,
        userDetails: action.data.userDetails,
        profilePic: action.data.profilePic
          ? convertBlob(action.data.profilePic)
          : ProfileIcon,
      };
    }
    case "RENDER_HOME_PAGE": {
      return { ...state, isLoggedInSuccess: true };
    }
    default:
      return state;
  }
}
//home page component
//this is parent component and  manages masks  and shopping card component
const HomePage = (props) => {
  const userDetailsData = useContext(UserContext);
  const [homeState, dispatch] = useReducer(reducer, homePageInitialState);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const showProfile = () => setShow(true);
  return (
    <div>
      {userDetailsData.isLoggedInSuccess ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h6 className="text-height-2">
                  Surgical face masks IIR 3 - ply (CHF 25.- per Box)
                </h6>
              </div>
            </div>
            <CartPage
              invoiceAddress={props.profile.invoiceAddress}
              showProfile={showProfile}
            ></CartPage>
            <div className="row">
              <div className="col-md-12">
                <h6 className="center-position top-space-25">Info: </h6>
                <ul>50 pcs. per Box | 800 Boxes per palett</ul>
                <ul>minimum order quantity - 200 boxes per palett</ul>
                <ul>maximum order quantity - 9600 boxes or 12 pallets</ul>
              </div>
            </div>
          </div>
          <Profile
            profileInfo={props.profile}
            setProfile={props.setProfile}
            show={show}
            handleClose={handleClose}
          ></Profile>
        </>
      ) : undefined}
    </div>
  );
};

export default HomePage;
