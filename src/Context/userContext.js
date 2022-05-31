import React from "react";

// hold the users details at context level and other component can access this informtion any time 
export const userDetail = {
  authorization: "",
  userid: "",
  isLoggedInSuccess: false,
  renderNavigationBar:false,
  setUserDetail: () => {},
};

export const UserContext = React.createContext({ userDetail });
