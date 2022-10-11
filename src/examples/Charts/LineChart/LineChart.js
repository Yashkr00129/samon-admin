import React, { useCallback, useEffect, useState } from "react";
import classes from "./LineChart.module.css";
import Chart from "react-google-charts";
import key from "../../../utils/config";
import { CircularProgress } from "@mui/material";

function LineChart() {
  const [chartData] = useState([
    ["Last 15 days", "Shoppers", "Influencers", "Sellers"],
  ]);
  const [chartLoaded, setChartLoaded] = useState(false);

  let token = JSON.parse(localStorage.getItem("token"));

  const fetchData = useCallback(async () => {
    const res = await fetch(`${key.BACKEND_URL}/admin/getLastHalfMonthsUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = JSON.parse(await res.text());

    let allData = response;
    let allChartData = [];
    let toDate = new Date();
    toDate.setHours(0);
    toDate.setMinutes(0);
    toDate.setSeconds(0);
    toDate.setMilliseconds(0);
    const start = new Date(toDate).setDate(toDate.getDate() - 30);
    const end = new Date(toDate);
    let loop = new Date(start);
    while (loop <= end) {
      let data = [];
      let date = loop.getDate();
      data.push(date.toString());
      let foundShopper = allData.shoppers.find(
        (shopper) => shopper._id === date
      );
      if (foundShopper) data.push(foundShopper.total);
      else data.push(0);

      let foundinfluencer = allData.influencers.find(
        (influencer) => influencer._id === date
      );
      if (foundinfluencer) data.push(foundinfluencer.total);
      else data.push(0);

      let foundSeller = allData.sellers.find((seller) => seller._id === date);
      if (foundSeller) data.push(foundSeller.total);
      else data.push(0);

      allChartData.push(data);

      let newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }
    return allChartData;
  }, [token]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      let data = await fetchData();
      if (isMounted) {
        chartData.push(...data);
        setChartLoaded(true);
      }
    })();
    return () => (isMounted = false);
  }, [fetchData, chartData]);

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
          width={"700px"}
          height={"400px"}
          chartType="Line"
          data={chartData}
          options={{
            chart: {
              title: "All Users Growth",
              subtitle: "Signups in month",
            },
          }}
        />
      )}
    </div>
  );
}

export default LineChart;
