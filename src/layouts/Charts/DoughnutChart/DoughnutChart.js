import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Chart from "react-google-charts";
import http from "http-common";
import classes from "./DoughnutChart.module.css";

function DoughnutChart() {
  const [data, setData] = useState(null);
  // const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
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
    const { totalRestaurants, totalRiders, totalVendors, totalShoppers, totalGrocers } = data.total;
    return (
      <div className={classes.chartContainer}>
        {totalShoppers === undefined && (
          <div
            style={{
              width: "375px",
              height: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
        {totalShoppers !== undefined && (
          <Chart
            width="375px"
            height="250px"
            chartType="PieChart"
            data={[
              ["User Type", "No. User"],
              ["Shoppers", totalShoppers],
              ["Vendors", totalVendors],
              ["Restaurants", totalRestaurants],
              ["Riders", totalRiders],
              ["Grocers", totalGrocers],
            ]}
            options={{
              title: "All Users",
              pieHole: 0.2,
            }}
          />
        )}
      </div>
    );
  }
}

export default DoughnutChart;
