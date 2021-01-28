const Item = require("../Module/itemModule");

exports.getItem = async (req, res) => {
  await Item.find((err, data) => {
    console.log(data);
    res.status(200).json({ response: data });
  });
};

exports.addItem = (req, res) => {
  const { item } = req.body;
  const newdb = new Item({ item });
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
