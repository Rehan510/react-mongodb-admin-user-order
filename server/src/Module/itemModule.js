const mongoose = require("mongoose");
const itemsSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Items", itemsSchema);
