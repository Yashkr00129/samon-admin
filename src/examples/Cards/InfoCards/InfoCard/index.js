// import checkPropTypes from 'check-prop-types';
import PropTypes from "prop-types";
// import axios from "axios";
import React from "react";
import http from "http-common";

function InfoCard({ link }) {
  const [data, setData] = React.useState(null);
  // const backendUrl = "http://localhost:5000";
  function capSplit(str) {
    return str.replace(
      /(^[a-z]+)|[0-9]+|[A-Z][a-z]+|[A-Z]+(?=[A-Z][a-z]|[0-9])/g,
      (match, first) => {
        let m = match;
        if (first) m = match[0].toUpperCase() + match.substr(1);
        m += " ";
        return m;
      }
    );
  }
  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    http
      .get(`/v1/admin/get${link}Overview`, {
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
          console.log("here");
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, []);

  const result = [];
  let heading;
  if (data) {
    if (link === "Todays") heading = "Today";
    if (link === "Week") heading = "This Week";
    if (link === "ThisMonth") heading = "This Month";
    if (link === "Dashboard") heading = "Total";
    Object.entries(data.total).map((item) => {
      let val;
      if (item[1] > 0) {
        val = <span style={{ color: "#32CD32", float: "right" }}>{item[1]}</span>;
      } else {
        val = <span style={{ float: "right" }}>{item[1]}</span>;
      }
      result.push(
        <li key={item[0]}>
          <span style={{ color: "#800000", fontWeight: "500" }}>{capSplit(item[0])}: </span>
          <nbsp />
          {val}
        </li>
      );
      return 1;
    });
    return (
      <div
        style={{
          border: "2px solid lightgray",
          backgroundColor: "#fff",
          fontSize: "0.75em",
          listStyleType: "none",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <h2 style={{ padding: "8px" }}>{heading}</h2>
        <hr />
        <ul style={{ listStyleType: "none", padding: "8px 20px 8px 9px" }}>{result}</ul>
      </div>
    );
  }
}

InfoCard.defaultProps = {
  //   link: "Dashboard",
};

InfoCard.propTypes = {
  link: PropTypes.string.isRequired,
};

export default InfoCard;
