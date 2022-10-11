/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import MDBox from "components/MDBox";
import Popup from "layouts/popups/popupviewproduct";
import http from "http-common";
import React from "react";
import ToggleButton from "react-toggle-button";

export default function userData(data, setIsChanged) {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const toggleBestDeal = async (itemId) => {
    await http
      .patch(
        `/v1/admin/toggleBestDeal`,
        {
          itemId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setIsChanged(Math.random());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    columns: [
      { Header: "s no.", accessor: "sno", width: "7%", align: "left" },
      { Header: "title", accessor: "title", width: "20%", align: "left" },
      { Header: "price", accessor: "price", align: "center" },
      { Header: "state", accessor: "state", align: "center" },
      { Header: "best deal", accessor: "bestdeal", align: "center" },
      { Header: "actions", accessor: "action", align: "center" },
    ],
    rows: data.products.map((product, index) => ({
      sno: index + 1,
      title: product.productTitle,
      price: product.price,
      state: product.state,
      bestdeal: (
        <ToggleButton
          value={product.isBestDeal}
          onToggle={() => {
            toggleBestDeal(product._id);
          }}
        />
      ),
      action: (
        <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
          <MDBox mr={1}>
            <Popup usertype="product" {...product} />
          </MDBox>
        </MDBox>
      ),
    })),
  };
}
