/* eslint-disable */

import React from "react";
import Popup from "reactjs-popup";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import Collapsible from 'react-collapsible';

export default function MenusPopup(props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const items = props.items;
  const listItems = [];
  function getDishes(menu) {
    const items = [];
    menu.forEach((dish) => {
      items.push(
        <tr className="table-row">
          <td>{dish.dishName} -{' '}</td>
          <td>{dish.price}</td>
        </tr>
      );
    });
    return items;
  }
  if (items) {
    if(props.type === "menus")
    {
    items.forEach((menu) => {
      const dishes = getDishes(menu.dishes);
      listItems.push(
        <Collapsible class="collapsible" trigger={menu.menuTitle}>
          <div className="table" style={{display: "block"}}>
            <table className="table table-hover">
              <tbody>
                {dishes}
              </tbody>
            </table>
          </div><br/>
        </Collapsible>
      );
    })
  }
  else
  {
    items.forEach((order) => {
      listItems.push(
        <Collapsible trigger={`${order.product ?.productTitle || order.stuff ?.groceryTitle || order.dish ?.dishName} x ${order.quantity}`}>
          <div className="table" style={{display: "block"}}>
            <table className="table table-hover">
              <tbody>
                <tr className="table-row">
                  <td key={`orderId`}>orderId:</td>
                  <td key={`${order.orderId}`}>{order.orderId}</td>
                </tr>
                <tr className="table-row">
                  <td key={`itemId`}>Item Id:</td>
                  <td key={`${order.stuff ?._id || order.product ?._id || order.dish ?._id}`}>{order.stuff ?._id || order.product ?._id || order.dish ?._id}</td>
                </tr>
                <tr className="table-row">
                  <td key={`shopperId`}>Shopper Id:</td>
                  <td key={`${order.shopperId}`}>{order.shopper ?._id}</td>
                </tr>
                <tr className="table-row">
                  <td key={`shopperName`}>Shopper Name:</td>
                  <td key={`${order.shopperId}`}>{order.shopper ?.fullName}</td>
                </tr>
                <tr className="table-row">
                  <td key={`sellerId`}>Seller Id:</td>
                  <td>{order.vendor ?._id || order.restaurant ?._id || order.grocer ?._id}</td>
                </tr>
                <tr className="table-row">
                  <td key={`sellerName`}>Seller Name:</td>
                  <td>{order.vendor ?.fullName || order.restaurant ?.fullName || order.grocer ?.fullName}</td>
                </tr>
              </tbody>
            </table>
          </div><br/>
        </Collapsible>
      );
    });
  }
  }



  return (
    <Popup trigger={
      <MDButton variant="text" color={darkMode ? "white" : "dark"}>
        <Icon>visibility</Icon>&nbsp;view
      </MDButton>
    } modal> 
      {close => (
        <div className="modal" style={{ maxWidth: "90vh", minWidth: "400px", height: "65vh", maxHeight: "65vh", overflow: "auto", boxShadow: "10px 10px 10px #9E9E9E", backgroundColor: "white", border: "1px solid gray", borderRadius: "20px", padding: "15px" }}>
          <button className="close" onClick={()=>close()}> &times; </button>
          <div className="header"> {props.title} </div>
          <div style={{ scroll: "auto", paddingBottom: "20px", width: "100%" }}>
            {listItems}
          </div>
        </div>
        )
      }
    </Popup>
  );
};
