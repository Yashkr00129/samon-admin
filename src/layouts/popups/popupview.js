/* eslint-disable */

import React from "react";
import Popup from "reactjs-popup";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import http from "http-common";

export default function ViewPopup({
  refetchQuery,
  usertype,
  _id,
  address,
  fullName,
  profilePicture,
  adhaarFile,
  gst,
  adhaarCardNumber,
  panCardNumber,
  ifscCode,
  status,
  phone,
  email,
}) {
  const User = usertype.replace(/./, (c) => c.toUpperCase());
  const userIdKey = User.toLowerCase() + "Id";
  const token = JSON.parse(sessionStorage.getItem("token"));

  const handleApproval = async (status) => {
    try {
      await http.post(
        `/v1/admin/approveOrReject${User}`,
        {
          [userIdKey]: _id,
          status,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      refetchQuery();
    } catch (err) {
      console.log(err.message);
    }
  };

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const addresses = address;
  const addressItems = [];
  if (addresses && addresses.length > 0) {
    for (const [index, value] of addresses.entries()) {
      addressItems.push(
        <div
          key={index}
          style={{
            padding: "10px",
            margin: "10px",
            border: "1px solid gray",
            borderRadius: "10px",
          }}
        >
          <p>
            {value.addressLine1}, {value.city}, {value.state}, {value.country} -{" "}
            {value.zipcode}
          </p>
          <p>Landmark: {value.landmark}</p>
        </div>
      );
    }
  }

  const ver =
    status === "approved" ? (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent="&#10004; APPROVED"
          color="success"
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ) : status === "pending" ? (
      <div>
        <MDBox ml={-1}>
          <MDBadge
            badgeContent="&#x26AC; APPROVAL PENDING"
            color="warning"
            variant="gradient"
            size="sm"
          />
        </MDBox>
        <div style={{ textAlign: "right" }}>
          <MDBox ml={-1}>
            <MDButton
              onClick={() => {
                handleApproval("approved");
                close();
              }}
              style={{ padding: "0" }}
              variant="text"
              color="success"
            >
              <MDBadge
                badgeContent="&#10004; APPROVE"
                color="success"
                variant="gradient"
                size="sm"
              />
            </MDButton>
            <MDButton
              onClick={() => {
                handleApproval("rejected");
                close();
              }}
              style={{ padding: "0" }}
              variant="text"
              color="error"
            >
              <MDBadge
                badgeContent="&times; REJECT"
                color="error"
                variant="gradient"
                size="sm"
              />
            </MDButton>
          </MDBox>
        </div>
      </div>
    ) : (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent="&times; REJECTED"
          color="error"
          variant="gradient"
          size="sm"
        />
      </MDBox>
    );

  return (
    <Popup
      trigger={
        <MDButton variant="text" color={darkMode ? "white" : "dark"}>
          <Icon>visibility</Icon>&nbsp;view
        </MDButton>
      }
      modal
    >
      {(close) => (
        <div
          className="modal"
          style={{
            maxWidth: "90vh",
            minWidth: "400px",
            height: "65vh",
            maxHeight: "65vh",
            overflow: "auto",
            boxShadow: "10px 10px 10px #9E9E9E",
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "20px",
            padding: "15px",
          }}
        >
          <button className="close" onClick={() => close()}>
            {" "}
            &times;{" "}
          </button>
          <div className="header"> {fullName} </div>
          <div style={{ scroll: "auto" }}>
            <div style={{ display: "flex" }}>
              <div style={{ textAlign: "center", maxWidth: "180px" }}>
                <img style={{ maxHeight: "150px" }} src={`${profilePicture}`} />
                <img
                  style={{ maxHeight: "180px", maxWidth: "100%" }}
                  src={`${adhaarFile}`}
                />
              </div>
              <div style={{ padding: "10px" }}>
                <div className="content">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>PHONE</span> {phone}{" "}
                </div>
                <div className="content">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>EMAIL</span> {email}{" "}
                </div>
                <div className="content">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>PAN CARD NO.</span>{" "}
                  {panCardNumber}{" "}
                </div>
                <div className="content">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>GST NO.</span> {gst}{" "}
                </div>
                <div className="content">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>
                    AADHAAR CARD NO.
                  </span>{" "}
                  {adhaarCardNumber}{" "}
                </div>
                <div className="content">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>IFSC CODE</span>{" "}
                  {ifscCode}{" "}
                </div>
              </div>
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>ADDRESSES</p>
              {addressItems}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              padding: "20px",
              width: "90%",
              boxSizing: "border-box",
            }}
          >
            {ver}
          </div>
        </div>
      )}
    </Popup>
  );
}
