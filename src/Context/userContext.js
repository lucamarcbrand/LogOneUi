import React from "react";

export const userDetail = {
  authorization: "",
  userid: "",
  isLoggedInSuccess: false,
  renderNavigationBar:false,
  setUserDetail: () => {},
};

export const UserContext = React.createContext({ userDetail });
