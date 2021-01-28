const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "Users" },
  item: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
