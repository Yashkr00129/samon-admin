import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Icon from "@mui/material/Icon";
import AddRegion from "./components/AddRegion";
import CatagoryTable from "./layouts/tables/categoryTable";
import TypeTable from "./layouts/tables/typeTable";
import AddCategory from "./components/AddCategory";
import AddType from "./components/AddType";
import AddSubCategory from "components/AddSubCategory";
import SubCategoryTable from "layouts/tables/subCategoryTable";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PublicIcon from "@mui/icons-material/Public";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";

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
    icon: <ShoppingBagIcon />,
    route: "/products",
    component: <Tables usertype="product" />,
  },
  {
    type: "collapse",
    name: "Groceries",
    key: "groceries",
    icon: <ShoppingBagIcon />,
    route: "/groceries",
    component: <Tables usertype="stuff" />,
  },
  {
    type: "collapse",
    name: "Product Orders",
    key: "productorders",
    icon: <Icon fontSize="small">assignment</Icon>,
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
    name: "Food Orders",
    key: "foodorders",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/foodorders",
    component: <Tables usertype="forder" />,
  },
  {
    type: "collapse",
    name: "Regions",
    key: "regions",
    icon: <PublicIcon />,
    route: "/regions",
    component: <Tables usertype="region" />,
  },
  {
    type: "collapse",
    name: "Withdrawals",
    key: "withdrawals",
    icon: <CurrencyRupeeIcon />,
    route: "/withdrawals",
    component: <Tables usertype="withdrawal" />,
  },
  {
    type: "collapse",
    name: "Catagories",
    key: "catagories",
    icon: <CategoryIcon />,
    route: "/catagories",
    component: <CatagoryTable />,
  },
  {
    type: "collapse",
    name: "SubCategory",
    key: "subcategory",
    icon: <CategoryIcon />,
    route: "/subcategory",
    component: <SubCategoryTable />,
  },
  {
    type: "collapse",
    name: "Types",
    key: "types",
    icon: <CategoryIcon />,
    route: "/types",
    component: <TypeTable />,
  },
  {
    type: "collapse",
    name: "Add Region",
    key: "addregion",
    icon: <AddIcon />,
    route: "/addregion",
    component: <AddRegion />,
  },
  {
    type: "collapse",
    name: "Add Category",
    key: "addcategory",
    icon: <AddIcon />,
    route: "/addcategory",
    component: <AddCategory />,
  },
  {
    type: "collapse",
    name: "Add SubCategory",
    key: "addsubcategory",
    icon: <AddIcon />,
    route: "/addsubcategory",
    component: <AddSubCategory />,
  }, {
    type: "collapse",
    name: "Add Type",
    key: "addtype",
    icon: <AddIcon />,
    route: "/addtype",
    component: <AddType />,
  },
];

export default routes;
