import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Icon from "@mui/material/Icon";
import AddRegion from "./components/AddRegion";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Shoppers",
    key: "shoppers",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/shoppers",
    component: <Tables usertype="shopper" />,
  },
  {
    type: "collapse",
    name: "Vendors",
    key: "vendors",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "vendors",
    component: <Tables usertype="vendor" />,
  },
  {
    type: "collapse",
    name: "Grocers",
    key: "grocers",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/grocers",
    component: <Tables usertype="grocer" />,
  },
  {
    type: "collapse",
    name: "Restaurants",
    key: "restaurants",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/restaurants",
    component: <Tables usertype="restaurant" />,
  },
  {
    type: "collapse",
    name: "Riders",
    key: "riders",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/riders",
    component: <Tables usertype="rider" />,
  },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/products",
    component: <Tables usertype="product" />,
  },
  {
    type: "collapse",
    name: "Groceries",
    key: "groceries",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/groceries",
    component: <Tables usertype="stuff" />,
  },
  {
    type: "collapse",
    name: "Product Orders",
    key: "productorders",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/productorders",
    component: <Tables usertype="porder" />,
  },
  {
    type: "collapse",
    name: "Grocery Orders",
    key: "groceryorders",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/groceryorders",
    component: <Tables usertype="gorder" />,
  },
  {
    type: "collapse",
    name: "Regions",
    key: "regions",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/region",
    component: <Tables usertype="region" />,
  },
  {
    type: "collapse",
    name: "Withdrawals",
    key: "withdrawals",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/withdrawals",
    component: <Tables usertype="withdrawal" />,
  },
  {
    type: "collapse",
    name: "Add Region",
    key: "addregion",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/addregion",
    component: <AddRegion />,
  },
];

export default routes;