import { Button } from "@mui/material";
import http from "../../../http-common";

export default function userData(data, setIsChanged) {
  return {
    columns: [
      { Header: "s no.", accessor: "sno", width: "10%", align: "left" },
      { Header: "name", accessor: "name", width: "20%", align: "left" },
      { Header: "base delivery", accessor: "baseDelivery", align: "center" },
      { Header: "description", accessor: "description", align: "center" },
      { Header: "actions", accessor: "delete", align: "center" },
    ],
    rows: data.regions.map((region, index) => ({
      sno: index + 1,
      name: region.regionName,
      baseDelivery: region.baseDelivery,
      description: region.description,
      delete: (
        <Button
          color={"primary"}
          variant={"contained"}
          onClick={() => deleteRegion(region._id, setIsChanged)}
        >
          Delete
        </Button>
      ),
    })),
  };
}

const deleteRegion = async (id, setIsChanged) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const headers = { authorization: `Bearer ${token}` };
  const config = { headers };
  const res = await http.delete(`/v1/region/deleteRegion/${id}`, config);
  console.log(res.data);
  setIsChanged(true);
};
