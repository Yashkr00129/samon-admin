import React, { useEffect, useCallback, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Chart from "react-google-charts";
import http from "http-common";
import classes from "./LineChart.module.css";

function LineChart() {
  const [data, setData] = useState(null);
  const [chartData] = useState([["Shoppers", "Vendors", "Restaurants", "Riders", "Grocers"]]);
  const [chartLoaded, setChartLoaded] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("token"));

  const fetchData = useCallback(async () => {
    http
      .get(`/v1/admin/getDashboardOverview`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const allData = data;
    const allChartData = [];
    const toDate = new Date();
    toDate.setHours(0);
    toDate.setMinutes(0);
    toDate.setSeconds(0);
    toDate.setMilliseconds(0);
    const start = new Date(toDate).setDate(toDate.getDate() - 7);
    console.log("here");
    console.log(start.getDate());
    const end = new Date(toDate);
    let loop = new Date(start);
    while (loop <= end) {
      const udata = [];
      const date = loop.getDate();
      udata.push(date.toString());
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      const foundShopper = allData.data.shoppers.find((shopper) => shopper._id === date);
      if (foundShopper) data.push(foundShopper.total);
      else udata.push(0);

      const foundVendor = allData.data.vendors.find((Vendor) => Vendor._id === date);
      if (foundVendor) udata.push(foundVendor.total);
      else udata.push(0);

      const foundRestaurant = allData.data.restaurants.find(
        (Restaurant) => Restaurant._id === date
      );
      if (foundRestaurant) udata.push(foundRestaurant.total);
      else udata.push(0);

      const foundrider = allData.data.riders.find((rider) => rider._id === date);
      if (foundrider) udata.push(foundrider.total);
      else udata.push(0);

      const foundGrocer = allData.data.grocers.find((grocer) => grocer._id === date);
      if (foundGrocer) udata.push(foundGrocer.total);
      else udata.push(0);

      allChartData.push(udata);

      const newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }
    return allChartData;
  }, [token]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const udata = await fetchData();
      if (isMounted) {
        chartData.push(...udata);
        setChartLoaded(true);
        console.log(chartData);
      }
    })();
    return function () {
      isMounted = false;
    };
  }, [fetchData, chartData]);

  if (data) {
    // const { totalRestaurants, totalRiders, totalVendors, totalShoppers, totalGrocers } = data.total;
    // const chartData = [
    //   [
    //     { type: "number", label: "x" },
    //     { type: "number", label: "values" },
    //     { id: "i0", type: "number", role: "interval" },
    //     { id: "i1", type: "number", role: "interval" },
    //     { id: "i2", type: "number", role: "interval" },
    //     { id: "i2", type: "number", role: "interval" },
    //     { id: "i2", type: "number", role: "interval" },
    //     { id: "i2", type: "number", role: "interval" },
    //   ],
    //   [1, 100, 90, 110, 85, 96, 104, 120],
    //   [2, 120, 95, 130, 90, 113, 124, 140],
    //   [3, 130, 105, 140, 100, 117, 133, 139],
    //   [4, 90, 85, 95, 85, 88, 92, 95],
    //   [5, 70, 74, 63, 67, 69, 70, 72],
    //   [6, 30, 39, 22, 21, 28, 34, 40],
    //   [7, 80, 77, 83, 70, 77, 85, 90],
    //   [8, 100, 90, 110, 85, 95, 102, 110],
    // ];

    return (
      <div className={classes.chart}>
        {!chartLoaded && (
          <div
            style={{
              width: "700px",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
        {chartLoaded && (
          <Chart
            width="700px"
            height="400px"
            chartType="Line"
            data={chartData}
            options={{
              chart: {
                title: "All Users(Shopper, Influencers, Sellers) Growth",
                subtitle: "Signups in month",
              },
            }}
          />
        )}
      </div>
    );
  }
}

export default LineChart;
