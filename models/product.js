const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // sellerid: {
  //   type: String,
  //   required: true,
  // },
  description: {
    type: String,
    required: true,
  },
  publicationType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  tags: [],
  policy: {
    warrenty: {
      type: String,
      required: true,
    },
    return: {
      type: String,
      required: true,
    },
  },
  shipping: {
    type: String,
    required: true,
  },
  shippingmethod: {
    type: String,
    required: true,
  },
  shippingtime: {
    type: String,
    required: true,
  },
  shippingcost: {
    type: String,
    required: true,
  },
  shippingcostextra: {
    type: String,
    required: true,
  },
  // singleProduct: {
  //   type: Boolean,
  //   required: true,
  // },
  variants: [],
});

module.exports = model("product", ProductSchema);
