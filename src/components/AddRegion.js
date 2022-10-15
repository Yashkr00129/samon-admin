import { TextField, Typography, Box, Grid, Button } from "@mui/material";
import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../examples/Navbars/DashboardNavbar";
import MDBox from "./MDBox";
import { useState } from "react";
import http from "../http-common";

export default function AddRegion() {
  const [formData, setFormData] = useState({
    regionName: "",
    packagingCost: "",
    baseDelivery: "",
    description: "",
  });

  const handleSubmit = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const headers = { authorization: `Bearer ${token}` };
    const config = { headers };
    const res = await http.post("/v1/region/addRegion", formData, config);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Typography
          variant={"h3"}
          color={"primary"}
          sx={{ marginBottom: "1rem" }}
        >
          Add Region
        </Typography>
        <Box sx={{ maxWidth: "700px", minWidth: "500px" }}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                label={"Region Name"}
                variant={"outlined"}
                name={"regionName"}
                value={formData.regionName}
                fullWidth
                onChange={handleChange}
                sx={{ height: "50px" }}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={"Packaging Cost"}
                variant={"outlined"}
                name={"packagingCost"}
                value={formData.packagingCost}
                fullWidth
                onChange={handleChange}
                sx={{ height: "50px" }}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={"Base Delivery"}
                variant={"outlined"}
                name={"baseDelivery"}
                value={formData.baseDelivery}
                fullWidth
                onChange={handleChange}
                sx={{ height: "50px" }}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={"Description"}
                variant={"outlined"}
                name={"description"}
                value={formData.description}
                fullWidth
                onChange={handleChange}
                sx={{ height: "50px" }}
              />
            </Grid>
          </Grid>
          <Button
            color={"primary"}
            variant={"contained"}
            sx={{ color: "white", my: "1rem" }}
            onClick={handleSubmit}
          >
            Add Region
          </Button>
        </Box>
      </MDBox>
    </DashboardLayout>
  );
}
