/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import MDBox from "components/MDBox";
import Popup from "layouts/popups/popupviewgorder";
import http from "../../../http-common";
import React from "react";

export default function userData(data, setIsChanged, riders) {
  const assignOrder = async (riderId, orderId) => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const payload = {
      riderId,
      orderId,
      orderModel: "Gorder",
    };
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    await http.post(`/v1/admin/asignOrderToRider`, payload, config);
    alert("order assigned");
    setIsChanged(true);
  };

  return {
    columns: [
      { Header: "s no.", accessor: "sno", align: "left" },
      { Header: "ordered at", accessor: "orderedat", align: "center" },
      { Header: "updated at", accessor: "updatedat", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "shopper", accessor: "shopper", align: "center" },
      { Header: "rider", accessor: "rider", align: "center" },
      { Header: "seller", accessor: "seller", align: "center" },
      { Header: "qty", accessor: "quantity", align: "center" },
      { Header: "actions", accessor: "action", align: "center" },
    ],
    rows: data.orders.map((order, index) => ({
      sno: index + 1,
      orderedat: order.orderedAt,
      updatedat: order.updatedAt,
      status: order.status,
      shopper: order.shopper?.fullName,
      rider: (
        <select
          onChange={(e) => assignOrder(e.target.value, order._id)}
          defaultValue={order.rider ? order.rider : "none"}
        >
          <option value="none">None</option>
          {riders.map((rider) => {
            return (
              <option value={rider._id}>
                {rider.fullName ? rider.fullName : "No Name"}
              </option>
            );
          })}
        </select>
      ),
      seller: order.grocer?.fullName,
      quantity: order.quantity,
      action: (
        <MDBox
          display="flex"
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}
        >
          <MDBox mr={1}>
            <Popup usertype="gorder" {...order} setIsChanged={setIsChanged} />
          </MDBox>
        </MDBox>
      ),
    })),
  };
}
