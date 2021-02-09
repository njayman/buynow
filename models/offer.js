const { model, Schema } = require("mongoose");

const OfferSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: "product" }],
    discount: {
      type: Number,
    },
    discountType: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("offer", OfferSchema);
