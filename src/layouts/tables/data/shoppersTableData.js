/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import Popup from "layouts/popups/popupviewshopper";
import BanPopup from "layouts/popups/popupban";

export default function userData(data, setIsChanged) {
  return {
    columns: [
      { Header: "s no.", accessor: "sno", width: "10%", align: "left" },
      { Header: "name", accessor: "name", width: "20%", align: "left" },
      { Header: "phone", accessor: "phone", align: "center" },
      // {
      //   Header: "verified",
      //   accessor: "verified",
      //   width: "15%",
      //   align: "center",
      // },
      { Header: "actions", accessor: "action", align: "center" },
    ],
    rows: data.shoppers.map((shopper, index) => ({
      sno: index + 1,
      name: shopper.fullName,
      phone: `+${shopper.phone}`,
      // verified: shopper.phoneVerified ? (
      //   <MDBox ml={-1}>
      //     <MDBadge
      //       badgeContent="&#10004;"
      //       color="success"
      //       variant="gradient"
      //       size="sm"
      //     />
      //   </MDBox>
      // ) : (
      //   <MDBox ml={-1}>
      //     <MDBadge
      //       badgeContent="&times;"
      //       color="error"
      //       variant="gradient"
      //       size="sm"
      //     />
      //   </MDBox>
      // ),
      action: (
        <MDBox
          display="flex"
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}
        >
          <MDBox mr={1}>
            <Popup usertype="shopper" {...shopper} />
            {/*<BanPopup usertype="shopper" setIsChanged={setIsChanged} userId={shopper._id} />*/}
          </MDBox>
        </MDBox>
      ),
    })),
  };
}
