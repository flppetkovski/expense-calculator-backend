const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
 name: {
  type: String,
  required: true,
  trim: true,
 },
 description: {
  type: String,
  trim: true,

  // required: true
 },

 type: {
  type: String,
  trim: true,
 },
 price: {
  type: Number,
 },
 date: {
  type: Date,
 },
 owner: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: "User"

 }
});



module.exports = Product