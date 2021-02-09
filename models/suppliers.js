const { model, Schema } = require("mongoose");

const SupplierSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    orders: {
      finished: [
        {
          type: Schema.Types.ObjectId,
          ref: "purchase",
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = model("supplier", SupplierSchema);
