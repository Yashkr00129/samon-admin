import { Button } from "@mui/material";
import MDBox from "../../../components/MDBox";
import Popup from "../../popups/popupviewshopper";
import BanPopup from "../../popups/popupban";
import http from "http-common";

export default function userData(data, setIsChanged) {
  const approve = async (withdrawalId) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const headers = { authorization: `Bearer ${token}` };
    const config = { headers };

    await http.post(
      "/v1/user/vendor/approveWithdrawal",
      {
        withdrawalId,
      },
      config
    );
    setIsChanged(true);
  };

  const reject = async (withdrawalId) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const headers = { authorization: `Bearer ${token}` };
    const config = { headers };

    await http.post(
      "/v1/user/vendor/rejectWithdrawal",
      {
        withdrawalId,
      },
      config
    );
    setIsChanged(true);
  };

  return {
    columns: [
      { Header: "s no.", accessor: "sno", width: "10%", align: "left" },
      { Header: "Vendor", accessor: "name", width: "20%", align: "left" },
      { Header: "Amount", accessor: "amount", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Actions", accessor: "action", align: "center" },
    ],
    rows: data.withdrawals.map((withdrawal, index) => ({
      sno: index + 1,
      name: withdrawal.vendor.fullName,
      amount: withdrawal.amount,
      status: withdrawal.status,
      action: (
        <MDBox
          display="flex"
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}
        >
          <MDBox mr={1}>
            <Button onClick={() => approve(withdrawal._id)}>Approve</Button>
            <Button onClick={() => reject(withdrawal._id)}>Decline</Button>
          </MDBox>
        </MDBox>
      ),
    })),
  };
}
