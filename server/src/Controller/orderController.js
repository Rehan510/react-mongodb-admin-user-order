const Order = require("../Module/orderModule");

/*exports.getOrder = async (req, res) => {
  await Order.find((err, data) => {
    console.log(data);
    res.status(200).json({ response: data });
  });
};
*/
exports.addOrder = (req, res) => {
  const { user_id, item, date } = req.body;
  const newdb = new Order({ user_id, item, date });
  newdb.save((error, data) => {
    if (data) {
      res
        .status(200)
        .json({ message: "successfully insertes", response: data });
    }
    if (error) {
      res.status(400).json({ message: error });
    }
  });
};
/*exports.getByid = async (req, res) => {
  try {
    await Order.find({ _id: req.body.id })
      .populate("user_id")
      .exec((error, data) => {
        if (data) {
          res.status(200).json({ message: data });
        }
      });
  } catch (error) {
    console.log(error);
  }
};*/
exports.getOrderbyUserid = async (req, res) => {
  try {
    await Order.find({ user_id: req.body.user_id })
      .populate("_id")
      .exec((error, data) => {
        if (data) {
          res.status(200).json({ message: data });
        }
      });
  } catch (error) {
    console.log(error);
  }
};
