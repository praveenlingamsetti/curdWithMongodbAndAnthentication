// models/Counter.js
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  id: String, // Name of the counter, e.g., "employee"
  seq: Number, // Current value of the counter
});

const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;
