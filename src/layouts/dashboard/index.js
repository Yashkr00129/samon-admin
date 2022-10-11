/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import PieChart from "examples/Charts/PieChart";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import http from "http-common";
import React from "react";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import InfoCard from "examples/Cards/InfoCards/InfoCard";
// import { PieChart } from "react-minimal-pie-chart";
import DoughnutChart from "layouts/Charts/DoughnutChart/DoughnutChart";
// import LineChart from "layouts/Charts/LineChart/LineChart";
// import LineChart from "react-linechart";

function Dashboard() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    http
      .get(`/v1/admin/getDashboardOverview`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, []);
  if (data) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <InfoCard link="Todays" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <InfoCard link="Week" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <InfoCard link="ThisMonth" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <InfoCard link="Dashboard" />
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={12} lg={8}>
              <MDBox mb={1.5}>
                <LineChart />
              </MDBox>
            </Grid> */}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <DoughnutChart />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default Dashboard;
