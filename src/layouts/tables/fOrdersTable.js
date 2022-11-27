import { Grid, Card, Box } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import http from "http-common";
import Loading from "../../components/Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const NotificationContainer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
      }}
    >
      <ToastContainer />
    </Box>
  );
};

export default function FordersTable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal State management
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [riders, setRiders] = useState([]);

  const token = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    const getData = async () => {
      const headers = { authorization: `Bearer ${token}` };
      const config = { headers };
      const res = await http.get("/v1/admin/getAllForders", config);
      setData(res.data);
    };

    const fetchRiders = async () => {
      const { data } = await http.get("/v1/admin/getAllRiders", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setRiders(data.riders);
    };

    const loadPage = async () => {
      setLoading(true);
      await fetchRiders();
      await getData();
      setLoading(false);
    };
    loadPage();
  }, []);

  if (loading === false) {

    const { columns, rows } = getTableData({
      data,
      setData,
      loading,
      setLoading,
      riders,
      handleOpen,
      open,
      handleClose,
    });

    return (
      <DashboardLayout>
        <NotificationContainer />
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
                    Food Orders.
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
        <Footer />
      </DashboardLayout>
    );
  } else {
    return <Loading />;
  }
}

const getTableData = ({ data, riders, handleOpen, open, handleClose }) => {
  const assignOrder = async (riderId, orderId) => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const payload = {
      riderId,
      orderId,
      orderModel: "Forder",
    };
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    await http.post(`/v1/admin/asignOrderToRider`, payload, config);
    alert("order assigned");
  };

  const orders = data.forders.reverse();
  return {
    columns: [
      { Header: "s no.", accessor: "sno", align: "left" },
      { Header: "updated at", accessor: "updatedat", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "shopper", accessor: "shopper", align: "center" },
      { Header: "rider", accessor: "rider", align: "center" },
      { Header: "seller", accessor: "seller", align: "center" },
      { Header: "qty", accessor: "quantity", align: "center" },
      { Header: "actions", accessor: "action", align: "center" },
    ],
    rows: orders.map((order, index) => ({
      sno: index + 1,
      updatedat: order.updatedAt.slice(0, 10),
      status: order.status,
      shopper: order.shopper?.fullName,
      rider: (
        <select
          onChange={(e) => assignOrder(e.target.value, order._id)}
          // defaultValue={order.rider?._id ? order.rider._id : "none"}
          value={order.rider?._id ? order.rider._id : "none"}
        >
          <option value="none">No Rider Assigned</option>
          {riders.map((rider) => {
            return (
              <option key={rider._id} value={rider._id}>
                {rider.fullName ? rider.fullName : "No Name"}
              </option>
            );
          })}
        </select>
      ),
      seller: order?.restaurant?.fullName,
      quantity: order.quantity,
      action: (
        <>
          <MDBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <MDBox mr={1}>
              <Button variant="contained" onClick={handleOpen}>
                View
              </Button>
            </MDBox>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <MDTypography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Order Details
                </MDTypography>
                <p>OrderId:- {order?._id}</p>
                <p>
                  Address:- {order.address.addressLine1},{" "}
                  {order?.address?.addressLine2}, {order?.address?.city},{" "}
                  {order?.address?.country}
                </p>
                <p>Phone:- {order.shopper?.phone}</p>
                <p>Order Status:- {order?.status}</p>
                <p>Shopper:- {order.shopper?.fullName}</p>
                <p>Rider:- {order.rider?.fullName}</p>
                {/*<p>Seller:- {order.restaurant.fullName}</p>*/}
              </Box>
            </Modal>
          </MDBox>
        </>
      ),
    })),
  };
};
