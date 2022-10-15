/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import Popup from "layouts/popups/popupviewrider";
import BanPopup from "layouts/popups/popupban";
import OrdersPopup from "layouts/popups/popupitems";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import http from "http-common";
import React from "react";
import Select from "react-select";
import { handleModal } from "../index";

const options = [
  { value: "productdelivery", label: "Product" },
  { value: "grocerydelivery", label: "Grocery" },
  { value: "fooddelivery", label: "Food" },
];

export default function userData(
  data,
  setIsChanged,
  open = null,
  setOpen = null
) {
  const refetchQuery = () => {
    setIsChanged(true);
  };
  const token = JSON.parse(sessionStorage.getItem("token"));
  const changeRole = async (riderId, riderRole) => {
    await http
      .post(
        `/v1/admin/changeRiderRole`,
        {
          riderId,
          riderRole,
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
      { Header: "name", accessor: "name", width: "20%", align: "left" },
      { Header: "phone", accessor: "phone", align: "center" },
      { Header: "email", accessor: "email", align: "center" },
      { Header: "role", accessor: "role", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "available", accessor: "available", align: "center" },
      { Header: "past orders", accessor: "pastorders", align: "center" },
      { Header: "active", accessor: "active", align: "center" },
      { Header: "actions", accessor: "action", align: "center" },
    ],
    rows: data.riders.map((rider, index) => ({
      sno: index + 1,
      name: rider.fullName,
      phone: `${rider.phone}`,
      email: rider.email,
      role: (
        <Select
          options={options}
          onChange={(option) => changeRole(rider._id, option.value)}
          value={{
            label: rider.role.slice(0, -8).replace(/./, (c) => c.toUpperCase()),
            value: rider.role,
          }}
        />
      ),
      status:
        /* eslint-disable-next-line no-nested-ternary */
        rider.status === "pending" ? (
          <MDBox ml={-1} onClick={() => handleModal(open, setOpen)}>
            <MDBadge
              badgeContent="&#x26AC;"
              color="warning"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ) : rider.status === "approved" ? (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="&#10004;"
              color="success"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ) : (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="&times;"
              color="error"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
      available:
        rider.available === false ? (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="NO"
              color="warning"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ) : (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="YES"
              color="success"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
      pastorders: (
        <OrdersPopup
          title={`Deliveries made by ${rider.fullName}`}
          type="orders"
          items={rider.pastOrders}
        />
      ),
      active:
        rider.active === false ? (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="NO"
              color="warning"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ) : (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="YES"
              color="success"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
      action:
        rider.active === true ? (
          <MDBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <MDBox mr={1}>
              <Popup usertype="rider" {...rider} refetchQuery={refetchQuery} />
              <BanPopup
                usertype="rider"
                userId={rider._id}
                setIsChanged={setIsChanged}
              />
            </MDBox>
          </MDBox>
        ) : (
          <MDBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <MDBox mr={1}>
              <Popup usertype="rider" {...rider} />
              <MDButton variant="text" color="light">
                <Icon>delete</Icon>&nbsp;ban
              </MDButton>
            </MDBox>
          </MDBox>
        ),
    })),
  };
}
