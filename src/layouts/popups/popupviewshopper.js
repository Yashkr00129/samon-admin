/* eslint-disable */

import React from "react";
import Popup from "reactjs-popup";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";

export default function ViewPopup(props) {
  const User = props.usertype.replace(/./, c => c.toUpperCase());
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const addresses = props.address;
  const addressItems = []
  if(addresses && addresses.length>0) {
    for (const [index, value] of addresses.entries()) {
      addressItems.push(<div key={index} style={{ padding:"10px", margin:"10px", border:"1px solid gray", borderRadius:"10px" }}>
        <p>
          {value.addressLine1}, {value.city}, {value.state}, {value.country} - {value.zipcode}
          </p>
        <p>
          Landmark: {value.landmark}
        </p>
      </div>)
    }
  }

  const ver = (props.phoneVerified) ? (
      <MDBox ml={-1} style={{display:"inline"}}>
      <MDBadge badgeContent="&#10004;" color="success" variant="gradient" size="sm" />
    </MDBox>
    ) : (
        <MDBox ml={-1}>
          <MDBadge badgeContent="&#x26AC; PENDING" color="warning" variant="gradient" size="sm" />
        </MDBox>
    )
  
  return (
    <Popup trigger={
      <MDButton variant="text" color={darkMode ? "white" : "dark"}>
        <Icon>visibility</Icon>&nbsp;view
      </MDButton>
    } modal> 
      {close => (
        <div className="modal" style={{ maxWidth: "90vh", minWidth: "400px", height: "65vh", maxHeight: "65vh", overflow: "auto", boxShadow: "10px 10px 10px #9E9E9E", backgroundColor: "white", border: "1px solid gray", borderRadius: "20px", padding: "15px" }}>
          <button className="close" onClick={()=>close()}> &times; </button>
          <div className="header"> {props.fullName} </div>
          <div style={{ scroll: "auto", padding:"10px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ textAlign: "center", maxWidth: "180px" }}>
              <img style={{ maxHeight: "150px" }} src={`${props.profilePicture}`} />
            </div>
            <div>
              <div className="content"> <span style={{fontWeight:"bold"}}>PHONE</span> {props.phone} </div>
              <div className="content"> <span style={{fontWeight:"bold"}}>VERIFICATION</span> {ver} </div>
            </div>
          </div>
          <div>
            <p style={{fontWeight:"bold"}}>ADDRESSES</p>
            {addressItems}
          </div>
          </div>
        </div>
        )
      }
    </Popup>
  );
};
