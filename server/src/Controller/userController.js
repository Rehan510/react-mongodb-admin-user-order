const { response } = require("express");
const Users = require("../Module/userModule");
//const Order = require("../module/order");

/*exports.getUser = async (req, res) => {
  await Users.find((err, data) => {
    console.log(data);
    res.status(200).json({ response: data });
  });
};*/

exports.addUser = async (req, res) => {
  const { admin_id, name, age, education } = req.body;
  const newdb = await new Users({ admin_id, name, age, education });
  newdb.save((error, data) => {
    if (data) {
      res
        .status(200)
        .json({ message: "successfully insertes", response: data.id });
    }
    if (error) {
      res.status(400).json({ message: error });
    }
  });
};

exports.getUserbyAdminid = async (req, res) => {
  try {
    const PAGE_SIZE = 5;
    const page = parseInt(req.query.page || "0");
    const total = await Users.countDocuments({ admin_id: req.body.adminid });
    await Users.find({ admin_id: req.body.adminid })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page)

      .populate("adminid")
      .exec((error, data) => {
        if (data) {
          res
            .status(200)
            .json({ message: data, totalPages: Math.ceil(total / PAGE_SIZE) });
          console.log(data);
        }
      });
  } catch (error) {
    console.log(error);
  }
};
/*exports.orderbyorder = async (req, res) => {
  try {
    await Users.find({ _id: req.body.user_id })
      .populate("_id")
      .exec((error, data) => {
        if (data) {
          res.status(200).json({ message: data });
        }
      });
  } catch (error) {
    console.log(error);
  }
};*/
