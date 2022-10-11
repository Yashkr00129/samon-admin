/* eslint-disable */
// import axios from "axios";
import React from "react";
import Popup from "reactjs-popup";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import http from "http-common";

export default function DeletePopup(props) {
  const { usertype, userId, setIsChanged } = props;
  const action = usertype === "shopper" ? "delete" : "bann";

  function handleDelete() {
    const User = usertype.replace(/./, (c) => c.toUpperCase());
    const userIdKey = User.toLowerCase() + "Id";
    const token = JSON.parse(localStorage.getItem("token"));

    http
      .post(
        `/v1/admin/${action}${User}`,
        {
          [userIdKey]: userId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setIsChanged(Math.random());
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Popup
      trigger={
        <MDButton variant="text" color="error">
          <Icon>delete</Icon>&nbsp;ban
        </MDButton>
      }
      modal
    >
      {(close) => (
        <div
          className="modal"
          style={{
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
          <div className="header">
            {" "}
            Are you sure you want to {action} the {usertype}?{" "}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MDButton
              variant="text"
              color="success"
              onClick={() => {
                handleDelete();
                close();
              }}
            >
              Continue
            </MDButton>
            <MDButton variant="text" color="error" onClick={close}>
              Cancel
            </MDButton>
          </div>
        </div>
      )}
    </Popup>
  );
}
