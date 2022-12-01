import { Grid, Card, Button, Box } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";
import http from "http-common";
import Loading from "./Loading";

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

export default function Banners() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const headers = { authorization: `Bearer ${token}` };
      const config = { headers };
      const res = await http.get("/v1/banner", config);
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  if (!loading) {
    const { columns, rows } = getTableData(data, setData);
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
                    Banners
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

const getTableData = (data, setData) => {
  return {
    columns: [
      { Header: "no", accessor: "no", align: "left" },
      { Header: "image", accessor: "image", align: "left" },
      { Header: "link", accessor: "link", align: "left" },
      { Header: "delete", accessor: "delete", align: "left" },
    ],
    rows: data.banners.map((banner) => ({
      no: banner.no,
      image: (
        <img
          src={banner.mediaLink}
          alt={banner.name}
          style={{ width: "100px" }}
        />
      ),
      link: banner.link,
      delete: (
        <Button
          variant={"contained"}
          onClick={() => deleteBanner(banner._id, data, setData)}
        >
          Delete
        </Button>
      ),
    })),
  };
};

const deleteBanner = async (id, data, setData) => {
  try {
    const banners = [...data.banners];
    const index = banners.findIndex((banner) => banner._id === id);
    banners.splice(index, 1);
    setData({ banners });
    const token = JSON.parse(sessionStorage.getItem("token"));
    const headers = { authorization: `Bearer ${token}` };
    const config = { headers };

    await http.delete(`/v1/admin/banner?id=${id}`, config);
    toast.success("Banner deleted successfully");
  } catch (err) {
    toast.error(err.message);
  }
};
