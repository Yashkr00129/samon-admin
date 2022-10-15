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
      `/v1/region/assignVendorRegion`,
      {  vendorId, regionId },
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
      { Header: "region", accessor: "assign", align: "center" },
      { Header: "active", accessor: "active", align: "center" },
      { Header: "actions", accessor: "action", align: "center" },
    ],
    rows: data.vendors.map((vendor, index) => ({
      sno: index + 1,
      name: vendor.fullName,
      phone: `+${vendor.phone}`,
      email: vendor.email,
      assign: (
        <>
          <select
            onChange={(e) => assignRegion(vendor._id, e.target.value)}
            defaultValue={vendor.region?._id ? vendor.region._id : "none"}
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
      status:
        /* eslint-disable-next-line no-nested-ternary */
        vendor.status === "pending" ? (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="&#x26AC;"
              color="warning"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ) : vendor.status === "approved" ? (
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
        vendor.active === false ? (
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
        vendor.active === true ? (
          <MDBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <MDBox mr={1}>
              <Popup
                usertype="vendor"
                {...vendor}
                refetchQuery={refetchQuery}
              />
              <BanPopup
                usertype="vendor"
                setIsChanged={setIsChanged}
                userId={vendor._id}
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
                usertype="vendor"
                {...vendor}
                vendor={vendor}
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
