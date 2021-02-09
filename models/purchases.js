const { model, Schema } = require("mongoose");

const PurchaseSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("purchase", PurchaseSchema);
