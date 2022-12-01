import { TextField, Typography, Box, Grid, Button } from "@mui/material";
import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../examples/Navbars/DashboardNavbar";
import MDBox from "./MDBox";
import { useState } from "react";
import http from "../http-common";
import { toast, ToastContainer } from "react-toastify";
import Loading from "./Loading";

export default function AddBanner() {
  const [formData, setFormData] = useState({
    no: "",
    categoryImage: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const headers = { authorization: `Bearer ${token}` };

      // call api/upload to get upload url
      // then change the payload accordingly

      const body = new FormData();
      body.append("files", formData.categoryImage);
      const { data } = await http.post("/v1/upload", body, { headers });

      const payload = {
        no: formData.no,
        mediaLink: data.data[0].Location,
        link: formData.link,
      };

      await http.post("/v1/admin/banner", payload, { headers });
      toast.success("Banner Added Successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout>
      <ToastContainer />
      <DashboardNavbar />
      {loading && <Loading />}
      <MDBox>
        <Typography
          variant={"h3"}
          color={"primary"}
          sx={{ marginBottom: "1rem" }}
        >
          Add Banner
        </Typography>
        <Box sx={{ maxWidth: "700px", minWidth: "500px" }}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                label={"No"}
                variant={"outlined"}
                name={"no"}
                value={formData.no}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12}>
              <input
                type="file"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    categoryImage: e.target.files[0],
                  });
                }}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={"Link"}
                variant={"outlined"}
                name={"link"}
                value={formData.link}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            color={"primary"}
            variant={"contained"}
            sx={{ color: "white", my: "1rem" }}
            onClick={handleSubmit}
          >
            Add Banner
          </Button>
        </Box>
      </MDBox>
    </DashboardLayout>
  );
}
