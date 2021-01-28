const express = require("express");
const verify = require("./auth");
const route = express.Router();
const {
  addOrder,
  getOrder,
  getByid,
  getOrderbyUserid,
} = require("../Controller/orderController");
const { register, login } = require("../Controller/adminController");
const {
  addUser,
  getUser,
  getUserbyAdminid,

  orderbyorder,
} = require("../Controller/userController");
const { getItem, addItem } = require("../Controller/itemController");

route.post("/register", register);
route.post("/login", login);
//route.get("/user", getUser);
route.post("/user", addUser);
route.post("/userid", getUserbyAdminid);
//route.get("/order", getOrder);
route.post("/order", addOrder);
route.post("/orderid", getOrderbyUserid);
//route.post("/orderbyorder", orderbyorder);*/
route.post("/item", addItem);
route.get("/item", getItem);

module.exports = route;
