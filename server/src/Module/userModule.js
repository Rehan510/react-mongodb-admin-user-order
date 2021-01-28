const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  admin_id: { type: mongoose.Types.ObjectId, ref: "Admins" },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
