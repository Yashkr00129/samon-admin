import React, { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// import { useHistory } from "react-router-dom";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import axios from "axios";
import http from "http-common";
// import React from "react";
import PropTypes from "prop-types";

function Basic({ setToken }) {
  // const [successSB, setSuccessSB] = useState(false);
  // const [infoSB, setInfoSB] = useState(false);
  // const [warningSB, setWarningSB] = useState(false);
  // const [errorSB, setErrorSB] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const backendUrl = "http://localhost:5000";
  // const openSuccessSB = () => setSuccessSB(true);
  // const closeSuccessSB = () => setSuccessSB(false);
  // const openInfoSB = () => setInfoSB(true);
  // const closeInfoSB = () => setInfoSB(false);
  // const openWarningSB = () => setWarningSB(true);
  // const closeWarningSB = () => setWarningSB(false);
  // const openErrorSB = () => setErrorSB(true);
  // const closeErrorSB = () => setErrorSB(false);
  // const renderSuccessSB = (
  //   <MDSnackbar
  //     color="success"
  //     icon="check"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={successSB}
  //     onClose={closeSuccessSB}
  //     close={closeSuccessSB}
  //     bgWhite
  //   />
  // );

  // const renderInfoSB = (
  //   <MDSnackbar
  //     icon="notifications"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={infoSB}
  //     onClose={closeInfoSB}
  //     close={closeInfoSB}
  //   />
  // );

  // const renderWarningSB = (
  //   <MDSnackbar
  //     color="warning"
  //     icon="star"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={warningSB}
  //     onClose={closeWarningSB}
  //     close={closeWarningSB}
  //     bgWhite
  //   />
  // );

  // const renderErrorSB = (
  //   <MDSnackbar
  //     color="error"
  //     icon="warning"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={errorSB}
  //     onClose={closeErrorSB}
  //     close={closeErrorSB}
  //     bgWhite
  //   />
  // );
  const handlePasswordChange = () => (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = () => (event) => {
    setEmail(event.target.value);
  };

  const handleSignIn = async (e) => {
    // const headers = {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "POST",
    //   "Access-Control-Allow-Headers": "Content-Type",
    // };
    e.preventDefault();
    let res;
    await http
      .post(`/v1/admin/login`, {
        email,
        password,
      })
      .then((response) => {
        res = response;
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    // setRequesting(false);
    const response = res.data;
    if (response.status) {
      console.log("success");
      sessionStorage.setItem("token", JSON.stringify(response.token));
      setToken(response.token);
    } else {
      console.log(res.status);
    }
    // const resStatus = response.status.toUpperCase();
    // const resMessage = response.message;
    // if (response.status === "success") {
    // Swal.fire({
    //   position: "top",
    //   icon: "success",
    //   title: `${resMessage}`,
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    // history.push("/");
    // }

    // if (response.status === "fail")
    //   Swal.fire(`${resStatus}`, `${resMessage}`, "error");
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            SAMONN
          </MDTypography>
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Admin Sign-in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput onChange={handleEmailChange(email)} type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                onChange={handlePasswordChange(password)}
                type="password"
                label="Password"
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleSignIn} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

Basic.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Basic;
