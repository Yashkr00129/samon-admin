/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import Popup from "layouts/popups/popupview";
import BanPopup from "layouts/popups/popupban";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import http from "../../../http-common";

export default function userData(data, setIsChanged, regions) {
  const refetchQuery = () => {
    setIsChanged(true);
  };

  const assignRegion = async (vendorId, regionId) => {
    if (regionId === "none") return;
    const token = JSON.parse(sessionStorage.getItem("token"));
    const headers = { authorization: `Bearer ${token}` };
    const config = { headers };
    const res = await http.post(
      `/v1/region/assignGrocerRegion`,
      { grocerId: vendorId, regionId },
      config
    );
    console.log(res.data);
    setIsChanged(true);
  };

  return {
    columns: [
      { Header: "s no.", accessor: "sno", width: "10%", align: "left" },
      { Header: "name", accessor: "name", width: "20%", align: "left" },
      { Header: "phone", accessor: "phone", align: "center" },
      { Header: "email", accessor: "email", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "active", accessor: "active", align: "center" },
      { Header: "region", accessor: "assign", align: "center" },
      { Header: "actions", accessor: "action", align: "center" },
    ],
    rows: data.grocers.map((grocer, index) => ({
      sno: index + 1,
      name: grocer.fullName,
      phone: `+${grocer.phone}`,
      email: grocer.email,
      status:
        /* eslint-disable-next-line no-nested-ternary */
        grocer.status === "pending" ? (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="&#x26AC;"
              color="warning"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ) : grocer.status === "approved" ? (
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
      active:
        grocer.active === false ? (
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
      assign: (
        <>
          <select
            onChange={(e) => assignRegion(grocer._id, e.target.value)}
            defaultValue={grocer.region?._id ? grocer.region._id : "none"}
          >
            <option value="none">None</option>
            {regions.map((region) => (
              <option key={region._id} value={region._id}>
                {region.regionName}
              </option>
            ))}
          </select>
        </>
      ),
      action:
        grocer.active === true ? (
          <MDBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <MDBox mr={1}>
              <Popup
                usertype="grocer"
                {...grocer}
                refetchQuery={refetchQuery}
              />
              <BanPopup
                usertype="grocer"
                setIsChanged={setIsChanged}
                userId={grocer._id}
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
              <Popup
                usertype="grocer"
                {...grocer}
                refetchQuery={refetchQuery}
              />
              <MDButton variant="text" color="light">
                <Icon>delete</Icon>&nbsp;ban
              </MDButton>
            </MDBox>
          </MDBox>
        ),
    })),
  };
}
