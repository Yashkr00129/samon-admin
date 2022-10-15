import { TextField, Typography, Box, Grid, Button } from "@mui/material";
import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../examples/Navbars/DashboardNavbar";
import MDBox from "./MDBox";
import { useState } from "react";
import http from "../http-common";
import { toast, ToastContainer } from "react-toastify";

export default function AddType() {
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryImage: "",
    keywords: "",
  });

  const handleSubmit = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const headers = { authorization: `Bearer ${token}` };

      // call api/upload to get upload url
      // then change the payload accordingly

      const body = new FormData()
      body.append("files", formData.categoryImage)
      const { data } = await http.post("/v1/upload", body, { headers })

      const payload = {
        name: formData.categoryName,
        image: data.data[0].Location,
        keywords: formData.keywords.split(","),
      };
      
      await http.post("/v1/type/addType", payload, { headers });
      toast.success("Type Added Successfully");
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
      <MDBox>
        <Typography
          variant={"h3"}
          color={"primary"}
          sx={{ marginBottom: "1rem" }}
        >
          Add Category
        </Typography>
        <Box sx={{ maxWidth: "700px", minWidth: "500px" }}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                label={"Category Name"}
                variant={"outlined"}
                name={"categoryName"}
                value={formData.categoryName}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12}>
              <input type="file" onChange={(e) => { setFormData({ ...formData, categoryImage: e.target.files[0] }) }} />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={"Keywords"}
                variant={"outlined"}
                name={"keywords"}
                value={formData.keywords}
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
            Add Category
          </Button>
        </Box>
      </MDBox>
    </DashboardLayout>
  );
}
