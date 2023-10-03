const mongoose = require("mongoose");

const sch = {
  name: String,
  email: String,
  user_id: String,
};
const monmodel = mongoose.model("NEWCOL", sch);

module.exports = monmodel;
