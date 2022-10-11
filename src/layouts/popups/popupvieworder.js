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

  const ver = props.shopper?.phoneVerified ? (
    <MDBox ml={-1} style={{ display: "inline" }}>
      <MDBadge
        badgeContent="&#10004;"
        color="success"
        variant="gradient"
        size="sm"
      />
    </MDBox>
  ) : (
    <MDBox ml={-1} style={{ display: "inline" }}>
      <MDBadge
        badgeContent="&#x26AC; PENDING"
        color="warning"
        variant="gradient"
        size="sm"
      />
    </MDBox>
  );

  const active = props.vendor?.active ? (
    <MDBox ml={-1} style={{ display: "inline" }}>
      <MDBadge
        badgeContent="ACTIVE"
        color="success"
        variant="gradient"
        size="sm"
      />
    </MDBox>
  ) : (
    <MDBox ml={-1} style={{ display: "inline" }}>
      <MDBadge
        badgeContent="INACTIVE"
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
            minHeight: "fit-content",
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
            &times;
          </button>
          <div className="header">Order ID - {props.orderId} </div>
          <div style={{ scroll: "auto" }}>
            <div style={{ padding: "7px" }}>
              {props.products.map((prd) => {
                <>
                  <div className="content">
                    <span style={{ fontWeight: "bold" }}>Product Name</span>
                    {/* {prd.productTitle} */}
                  </div>
                  <div className="content">
                    <span style={{ fontWeight: "bold" }}>Description</span>
                    {/* {prd.productDescription} */}
                  </div>
                  <div className="content">
                    <span style={{ fontWeight: "bold" }}>Category</span>
                    {/* {prd.category.name} */}
                  </div>
                  <div className="content">
                    <span style={{ fontWeight: "bold" }}>Subcategory</span>
                    {/* {prd.subCategory.name} */}
                  </div>
                  <div className="content">
                    <span style={{ fontWeight: "bold" }}>Price</span>
                    {/* {prd.price} */}
                  </div>
                  <div className="content">
                    <span style={{ fontWeight: "bold" }}>State</span>
                    {/* {prd.state} */}
                  </div>
                </>;
              })}
            </div>
            <div style={{ padding: "7px" }}>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>Bill ID</span>{" "}
                {props.bill._id}{" "}
              </div>
            </div>
            <div style={{ padding: "7px" }}>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>Address</span>
                <p>
                  {props.address?.addressLine1}, {props.address?.city},{" "}
                  {props.address?.state}, {props.address?.country} -{" "}
                  {props.address?.zipcode}
                </p>
                <p>Landmark: {props.address?.landmark}</p>
              </div>
            </div>
            <div style={{ padding: "7px" }}>
              <div className="content" style={{ fontWeight: "bold" }}>
                SHOPPER
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>Name</span>{" "}
                {props.shopper?.fullName}{" "}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>Phone</span>{" "}
                {props.shopper?.phone}{" "}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>Verification</span> {ver}{" "}
              </div>
            </div>
            <div style={{ padding: "7px" }}>
              <div className="content" style={{ fontWeight: "bold" }}>
                VENDOR {active}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>Name</span>{" "}
                {props.vendor.fullName}{" "}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>Phone</span>{" "}
                {props.vendor.phone}{" "}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>Email</span>{" "}
                {props.vendor.email}{" "}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>PAN Card No.</span>{" "}
                {props.vendor.panCardNumber}{" "}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>GST No.</span>{" "}
                {props.vendor.gst}{" "}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>
                  Aadhaar Card No.
                </span>{" "}
                {props.vendor.adhaarCardNumber}{" "}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>IFSC Code</span>{" "}
                {props.vendor.ifscCode}{" "}
              </div>
            </div>
            <div style={{ padding: "7px" }}>
              <div className="content" style={{ fontWeight: "bold" }}>
                RIDER
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>Name</span>{" "}
                {props.rider?.fullName}{" "}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>Phone</span>{" "}
                {props.rider?.phone}{" "}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>Email</span>{" "}
                {props.rider?.email}{" "}
              </div>
              <div className="content">
                {" "}
                <span style={{ fontWeight: "bold" }}>
                  Aadhaar Card No.
                </span>{" "}
                {props.rider?.adhaarCardNumber}{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}
