const mongoose = require("mongoose");
const todoTaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("TodoTask", todoTaskSchema);
