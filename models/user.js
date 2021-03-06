const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
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
    membership: {
      type: String,
      required: true,
      default: "free",
    },
    favourite: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
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

module.exports = model("user", UserSchema);
