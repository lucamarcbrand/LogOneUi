import React,{useState} from "react";
import {Offcanvas} from 'react-bootstrap'
import RegisterationPage from "../Registration/RegisterationPage";
export const Profile = ({show,handleClose,profileInfo,setProfile}) => {

  const handleProfileClose = () => handleClose();
 
  return (
    <>

      <Offcanvas show={show} onHide={handleProfileClose} backdrop="static" placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <RegisterationPage profileInfo={profileInfo} setProfile={setProfile}></RegisterationPage>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
