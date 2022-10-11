/* eslint-disable */

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

// Data
import shoppersTableData from "layouts/tables/data/shoppersTableData";
import vendorsTableData from "layouts/tables/data/vendorsTableData";
import grocersTableData from "layouts/tables/data/grocersTableData";
import restaurantsTableData from "layouts/tables/data/restaurantsTableData";
import ridersTableData from "layouts/tables/data/ridersTableData";
import productsTableData from "layouts/tables/data/productsTableData";
import stuffsTableData from "layouts/tables/data/stuffsTableData";
import pordersTableData from "layouts/tables/data/pordersTableData";
import gordersTableData from "layouts/tables/data/gordersTableData";
import regionsTableData from "layouts/tables/data/regionsTableData";
import withdrawalsTableData from "layouts/tables/data/withdrawalsTableData";

import { useEffect, useState } from "react";
import http from "http-common";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const handleModal = (open, setOpen) => {
  setOpen(!open);
};

function Tables({ usertype }) {
  const Users = usertype.replace(/./, (c) => c.toUpperCase()) + "s";
  let users =
    usertype === "porder" || usertype === "gorder" ? "orders" : usertype + "s";
  const title =
    usertype === "porder" || usertype === "gorder" ? "Orders" : Users;
  const [data, setData] = useState(null);
  const [isChanged, setIsChanged] = useState(null);
  const [open, setOpen] = useState(false);

  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(null);

  const [riders, setRiders] = useState([]);

  const token = JSON.parse(sessionStorage.getItem("token"));

  const fetchRiders = async () => {
    const { data } = await http.get("/v1/admin/getAllRiders", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setRiders(data.riders);
  };

  useEffect(() => {
    console.log(isChanged, "isChanged");
    async function getUsers() {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const headers = { authorization: `Bearer ${token}` };
      const config = { headers };
      try {
        let res = await http.get(
          `/v1/${getAPIPath(usertype)}/getAll${Users}`,
          config
        );
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchRiders();
    getUsers();
  }, [usertype, isChanged]);

  useEffect(() => {
    if (
      usertype === "vendor" ||
      usertype === "grocer" ||
      usertype === "restaurant"
    ) {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const headers = { authorization: `Bearer ${token}` };
      const config = { headers };
      http
        .get("/v1/region/getAllRegions", config)
        .then((res) => {
          setRegions(res.data.regions);
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  function getAPIPath(usertype) {
    if (usertype === "product") return "user/product";
    if (usertype === "stuff") return "user/grocery";
    if (usertype === "region") return "region";
    if (usertype === "withdrawal") return "user/vendor";
    return "admin";
  }

  function getUsersTableData(data) {
    if (usertype === "shopper") return shoppersTableData(data, setIsChanged);
    if (usertype === "product") return productsTableData(data, setIsChanged);
    if (usertype === "stuff") return stuffsTableData(data, setIsChanged);
    if (usertype === "porder")
      return pordersTableData(data, setIsChanged, riders);
    if (usertype === "gorder")
      return gordersTableData(data, setIsChanged, riders);
    if (usertype === "region") return regionsTableData(data, setIsChanged);
    if (usertype === "withdrawal")
      return withdrawalsTableData(data, setIsChanged);
    if (usertype === "vendor")
      return vendorsTableData(data, setIsChanged, regions);
    if (usertype === "grocer")
      return grocersTableData(data, setIsChanged, regions);
    if (usertype === "restaurant")
      return restaurantsTableData(data, setIsChanged, regions);
    if (usertype === "rider")
      return ridersTableData(data, setIsChanged, open, setOpen);
  }

  if (data && data[users]) {
    const { columns, rows } = getUsersTableData(data);
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    {title}
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted
                    entriesPerPage
                    showTotalEntries
                    canSearch
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
        <Footer />
      </DashboardLayout>
    );
  }
}

Tables.defaultProps = {
  usertype: "shopper",
};

Tables.propTypes = {
  usertype: PropTypes.oneOf([
    "shopper",
    "vendor",
    "grocer",
    "restaurant",
    "rider",
    "product",
    "stuff",
    "porder",
    "gorder",
    "paymentrequest",
    "region",
    "withdrawal",
  ]),
};

export default Tables;
