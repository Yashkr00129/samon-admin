/* eslint-disable */

import React from "react";
import Popup from "reactjs-popup";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";

export default function ViewPopup(props) {
  
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const ver = (props.grocer?.status === "approved") ? (
      <MDBox ml={-1} style={{display:"inline"}}>
      <MDBadge badgeContent="&#10004; APPROVED" color="success" variant="gradient" size="sm" />
    </MDBox>
    ) : (props.grocer?.status === "pending") ? (
        <MDBox ml={-1} style={{display:"inline"}}>
          <MDBadge badgeContent="&#x26AC; APPROVAL PENDING" color="warning" variant="gradient" size="sm" />
        </MDBox>
    ) : (
    <MDBox ml={-1} style={{display:"inline"}}>
      <MDBadge badgeContent="&times; REJECTED" color="error" variant="gradient" size="sm" />
    </MDBox>
    );

  const images = props.images;
  const imageItems = []
  if(images && images.length>0) {
    for (const [index, value] of images.entries()) {
      imageItems.push(<div key={index} style={{ display:"inline", padding:"10px", margin:"10px", border:"1px solid gray", borderRadius:"10px" }}>
        <img style={{height:"150px"}} src={`${value}`} />
      </div>)
    }
  }
  return (
    <Popup trigger={
      <MDButton variant="text" color={darkMode ? "white" : "dark"}>
        <Icon>visibility</Icon>&nbsp;view
      </MDButton>
    } modal> 
      {close => (
        <div className="modal" style={{ maxWidth: "90vh", minWidth: "400px", minHeight:"fit-content", maxHeight: "65vh", overflow: "auto", boxShadow: "10px 10px 10px #9E9E9E", backgroundColor: "white", border: "1px solid gray", borderRadius: "20px", padding: "15px" }}>
          <button className="close" onClick={()=>close()}> &times;</button>
          <div className="header"> {props.groceryTitle} </div>
          <div style={{ scroll: "auto" }}>
            <div style={{ display: "flex", padding:"5px" }}>
              <div style={{padding:"7px"}}>
                <div className="content"> <span style={{fontWeight:"bold"}}>Description</span> {props.groceryDescription} </div>
                <div className="content"> <span style={{fontWeight:"bold"}}>Category</span> {props.type?.name} </div>
                <div className="content"> <span style={{fontWeight:"bold"}}>Price</span> {props.price} </div>
                <div className="content"> <span style={{fontWeight:"bold"}}>State</span> {props.state} </div>
              </div>
              <div>
                <div style={{padding:"7px"}}>
                  <div className="content"> <span style={{fontWeight:"bold"}}>Grocer</span> {props.grocer?.fullName} </div>
                  <div className="content"> <span style={{fontWeight:"bold"}}>Phone</span> {props.grocer?.phone} </div>
                  <div className="content"> <span style={{fontWeight:"bold"}}>Email</span> {props.grocer?.email} </div>
                  <div className="content"> <span style={{fontWeight:"bold"}}>Status</span> {ver} </div>
                </div>
              </div>
            </div>
            <div style={{overflowX:"auto", height:"200px", padding:"10px"}}>
              {imageItems}
            </div>
          </div>
        </div>
        )
      }
    </Popup>
  );
};
