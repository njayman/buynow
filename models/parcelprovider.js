const { model, Schema } = require("mongoose");

const ParcelProviderSchema = new Schema(
  {
    name: {
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
    capacity: {
      type: Number,
      required: true,
    },
    orders: [
      {
        pruchaseid: {
          type: Schema.Types.ObjectId,
          ref: "purchase",
        },
        status: {
          type: String,
        },
        deliverystatus: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("parcelprovider", ParcelProviderSchema);
