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
import Loading from "../../components/Loading";

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

export default function CatagoryTable({ usertype }) {
  const [data, setData] = useState(null);
  const [isChanged, setIsChanged] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const headers = { authorization: `Bearer ${token}` };
      const config = { headers };
      const res = await http.get("/v1/type/getAllType", config);

      setData(res.data);
      setIsChanged(true);
      setLoading(false);
    };
    getData();
  }, [isChanged]);

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
                >``
                  <MDTypography variant="h6" color="white">
                    Types
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
      { Header: "s no.", accessor: "sno", align: "left" },
      { Header: "name", accessor: "name", align: "left" },
      { Header: "image", accessor: "image", align: "left" },
      { Header: "keywords", accessor: "keywords", align: "left" },
      { Header: "delete", accessor: "delete", align: "left" },
    ],
    rows: data.types.map((type, index) => ({
      sno: index + 1,
      name: type.name,
      image: (
        <img
          src={type.image}
          alt={type.name}
          style={{ width: "100px" }}
        />
      ),
      keywords: type.keywords.map((keyword) => (
        <p key={keyword}>{keyword}</p>
      )),
      delete: (
        <Button
          variant={"contained"}
          onClick={() => deleteType(type._id, data, setData)}
        >
          Delete
        </Button>
      ),
    })),
  };
};

const deleteType = async (id, data, setData) => {
  try {
    console.log(data)
    const { types } = data;
    console.log(types)
    const token = JSON.parse(sessionStorage.getItem("token"));
    const headers = { authorization: `Bearer ${token}` };
    await http.delete(`/v1/type/deleteType/${id}`, { headers });
    setData({ ...data, types: types.filter((type) => type._id !== id) });
    toast.success("Type deleted successfully");
  } catch (err) {
    toast.error(err.message);
  }
};
